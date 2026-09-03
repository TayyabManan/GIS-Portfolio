---
slug: "building-us-visa-prediction"
title: "Predicting US Visa Outcomes: EDA to Deployment"
seoTitle: "US Visa Approval Predictor with SHAP"
description: "An ML system that predicts PERM labor-certification outcomes: EDA on 25K records, five boosting algorithms compared, threshold tuning for class imbalance, SHAP explainability, and deployment on Hugging Face Spaces."
date: "2026-04-05"
author: "Tayyab Manan"
category: "Machine Learning"
tags: ["Machine Learning", "Classification", "SHAP", "XGBoost", "FastAPI", "MLOps", "Explainable AI"]
image: "/projects/us-visa-prediction.webp"
readTime: "15 min read"
faqs:
  - question: "How accurate is the US visa (PERM) prediction model?"
    answer: "The production model is threshold-tuned Gradient Boosting: 73.2% test accuracy with 61.4% recall on denials across a 5,096-case hold-out set. Accuracy was traded down slightly to catch more at-risk cases."
  - question: "Why not use SMOTEENN to fix the class imbalance?"
    answer: "SMOTEENN inflated cross-validation scores but didn't generalize. The models overfit synthetic samples near the decision boundary. Training on the natural 2:1 distribution and tuning the threshold to 0.37 worked better."
  - question: "Is the visa predictor legal advice?"
    answer: "No. It's an informational risk indicator built on historical DOL patterns, hosted free, with a SHAP explanation for every prediction. It is not a decision tool or a substitute for an immigration attorney."
  - question: "How does the model explain its predictions?"
    answer: "SHAP's TreeExplainer computes each feature's contribution, aggregated from ~20 encoded features back to the 10 original ones, with a rule-based fallback so every prediction gets a human-readable explanation even when SHAP fails."
howTo:
  name: "How to build the US visa (PERM) prediction pipeline"
  description: "The five-stage CRISP-DM MLOps pipeline behind the PERM approval predictor, from raw records to a deployed, explainable model."
  steps:
    - name: "Data ingestion"
      text: "Read the 25,480 EasyVisa PERM records, engineer company_age from year of establishment, drop unused columns, and make a stratified train/test split."
    - name: "Data validation"
      text: "Validate columns against a schema and run Kolmogorov-Smirnov drift detection between the train and test sets before any transformation."
    - name: "Data transformation"
      text: "Fit a scikit-learn ColumnTransformer on training data only - ordinal, one-hot, and Yeo-Johnson power transforms - and serialize it with the model so training and inference match exactly."
    - name: "Model training"
      text: "Grid-search five boosting models with 5-fold cross-validation on the natural class distribution, then tune the decision threshold to 0.37 to meet a 60% denied-recall constraint."
    - name: "Model evaluation"
      text: "Compare the new model against the current production model and only promote it if F1 improves by at least 0.07, preventing regressions on retraining."
---

This is the long version of the [US Visa Approval Prediction](/projects/us-visa-prediction) project page. It follows the CRISP-DM pipeline end to end: the data, the EDA, model selection, the SHAP work, and the Docker deployment.

![the live predictor · 10-feature form, base rate and f1 stated up front](/projects/screens/us-visa-prediction.webp "app")

## Why predict PERM outcomes

When a U.S. employer wants to permanently hire a foreign worker, they file a [PERM (Program Electronic Review Management) labor certification](https://flag.dol.gov/programs/permanent) with the Department of Labor. The DOL either certifies or denies each case. The process takes 6-18 months, is commonly cited as costing $5,000-$15,000 in legal fees, and a denial means starting over.

The frustrating part is that applicants and immigration attorneys have limited visibility into which factors actually drive the decision. I wanted a model that predicts the outcome and, more to the point, explains why, so applicants can get a read on case strength before they file.

## Dataset: EasyVisa PERM records

I used the EasyVisa dataset: 25,480 historical PERM records with 10 usable features and a binary target (`case_status`: Certified or Denied).

The class distribution is 66.8% Certified (17,021) vs 33.2% Denied (8,459), a 2:1 imbalance. This matters because a classifier that predicts "Certified" for every case gets 66.8% accuracy while catching zero denials.

### The features

Three describe the applicant: `continent` (origin), `education_of_employee` (highest degree), and `has_job_experience` (Y/N). Two describe the employer: `no_of_employees` (company size) and `yr_of_estab`, which I turned into `company_age`. The rest describe the position: `prevailing_wage`, `unit_of_wage`, `region_of_employment`, `full_time_position`, and `requires_job_training`.

I dropped `case_id` (no predictive value) and replaced `yr_of_estab` with `company_age`, a relative measure that doesn't go stale.

## Exploratory data analysis

### Class imbalance

The 2:1 imbalance ruled out accuracy as the only metric. I needed something that penalizes missing denials, which led to the "accuracy with a denied-recall constraint" approach described in the modeling section.

### Feature patterns

Education has a clear ordinal relationship with approval: Doctorate holders get certified most often, High School the least. Makes sense, since PERM exists for specialized positions. Job experience also correlates with certification, presumably because prior experience signals the worker already has the claimed skills.

Requiring job training goes the other way and correlates with higher denial rates. If the applicant needs training, DOL is going to question whether they actually meet the requirements. Prevailing wage correlates positively with certification. High-wage positions tend to be specialized roles where qualified U.S. workers are harder to find.

Company size has a slight positive correlation. Larger employers probably have more established HR and legal processes for PERM filings, though the effect is small.

### Numeric feature distributions

`no_of_employees` and `company_age` are both heavily right-skewed, which is why there's a power transform in preprocessing. `prevailing_wage` varies wildly by `unit_of_wage`: a $35/hour wage and $72,800/year are the same thing, but the raw numbers differ by 2,000x. The model handles this by seeing both features together.

No missing values. All 25,480 records are complete.

## Preprocessing

### Encoding

Each feature type gets its own encoder:

- Ordinal encoding for `education_of_employee`, `has_job_experience`, `requires_job_training`, and `full_time_position`, which have a natural ordering or are binary
- One-hot encoding for `continent`, `unit_of_wage`, and `region_of_employment`, which are nominal
- A Yeo-Johnson power transform for `no_of_employees` and `company_age`, to tame the right skew
- Passthrough for `prevailing_wage`, which is already well-distributed for tree models

The preprocessing is a scikit-learn `ColumnTransformer` serialized alongside the model, so transforms at inference are identical to training.

### Pipeline components

Each stage is an independent component under `visa_approval_prediction/components/`:

1. `DataIngestion` reads the CSV, engineers `company_age`, drops unused columns, and does a stratified train/test split
2. `DataValidation` checks column presence against a schema and runs Kolmogorov-Smirnov drift detection between the train and test sets
3. `DataTransformation` builds and fits the ColumnTransformer on training data only (no leakage) and saves the transformed arrays

Each component takes a config object with paths and parameters, runs, and returns an artifact object describing its outputs. I could test, debug, or replace one stage without touching the others, which saved a lot of time during iteration.

## Model training

### Class imbalance without SMOTEENN

I tested SMOTEENN early on. It synthesizes minority samples and cleans noisy boundary samples. The results were disappointing: cross-validation scores looked inflated, but the gains didn't hold on the test set. The models were overfitting to synthetic samples near the decision boundary.

What worked better was training on the natural 2:1 distribution and adjusting the decision threshold afterward. The models get a learning signal that matches real-world class proportions, and it generalized better. LightGBM and CatBoost also handle imbalance internally through native class weighting.

### Picking a metric for imbalanced data

I initially optimized F1, but that produced models that over-predicted denials: high recall at the cost of too many false alarms. The final setup uses accuracy as the GridSearchCV metric, since it's the number stakeholders actually read, plus a post-training threshold that guarantees at least 60% recall on denials so the model still catches the cases that matter.

For an advisory tool (not a decision system), this balance works. Users see confidence scores and SHAP explanations, so a false alarm with low confidence is easy to dismiss.

### Model comparison

Five models went through GridSearchCV with 5-fold cross-validation:

| Model | Test accuracy | Denied recall | Denied F1 |
|-------|--------------|---------------|-----------|
| Random Forest | 73.8% | 48.1% | 55.0% |
| Gradient Boosting | 74.7% | 50.4% | 56.9% |
| XGBoost | 74.6% | 50.2% | 56.7% |
| LightGBM | 73.1% | 58.7% | 59.2% |
| CatBoost | 72.2% | 61.5% | 59.5% |
| Stacking (top 3) | 74.6% | 51.3% | 57.2% |
| **GBM + Threshold (0.37)** | **73.2%** | **61.4%** | **60.4%** |

Gradient Boosting had the highest individual accuracy (74.7%) but only 50.4% denied recall at the default 0.5 threshold. CatBoost got the best native denied recall (61.5%) through its built-in class weighting, but at lower accuracy. Stacking the top 3 (RF, GBM, XGB) didn't help, which I probably should have expected: they're too similar architecturally to gain much from ensembling.

The winner was threshold tuning on Gradient Boosting (0.50 to 0.37), which traded 1.5% accuracy for +11% denied recall. Best tradeoff I found.

### Threshold tuning

I swept the decision threshold from 0.30 to 0.70, plotting accuracy, denied recall, and F1 at each point. At 0.37 the model meets the 60% denied-recall constraint with the highest accuracy available.

The final model is wrapped in a `ThresholdClassifier` that applies this transparently. The rest of the pipeline sees a standard `predict()` / `predict_proba()` interface.

### Confusion matrix

On the test set (5,096 samples):

- 2,693 true negatives: certified cases correctly predicted, 79.1% of certified applications
- 1,038 true positives: denied cases caught, a 61.4% detection rate
- 711 false positives: certified cases wrongly flagged as at-risk, a 20.9% false alarm rate; confidence scores and SHAP explanations help users judge these
- 654 false negatives: denied cases missed, a 38.6% miss rate. This is why I keep saying the tool is a risk indicator, not a definitive predictor.

## SHAP explainability

A prediction by itself isn't very useful. Applicants need to know which factors helped, which hurt, and what they might change.

### TreeExplainer

I used SHAP's `TreeExplainer`, a fast, exact algorithm for tree-based models. For each prediction, SHAP computes a value for every feature showing how much it pushed the prediction toward Certified or Denied relative to the average case.

### Mapping SHAP values back to the original features

The preprocessing turns 10 raw features into about 20 encoded ones (one-hot encoding does that). SHAP operates on the transformed features. I built a mapping (`_build_feature_mapping` in `shap_explainer.py`) that aggregates encoded SHAP values back to original feature names, so the 6 one-hot columns for `continent` get summed into a single "continent" value.

This was trickier than I expected. Papers make SHAP look like a drop-in, but the gap between "here's a SHAP bar chart" and "here's an explanation a person can actually read" is real work.

### Reading the values

Negative SHAP pushes toward Certified (a strength); positive pushes toward Denied (a weakness). A magnitude above 1.0 is strong, 0.3-1.0 is moderate, and below 0.3 is slight.

### Rule-based fallback

SHAP can occasionally fail on edge cases. I added a rule-based fallback that produces heuristic explanations from known data patterns: education thresholds, wage benchmarks, company size breakpoints. Every prediction gets an explanation, even if SHAP chokes.

## Deployment

### Architecture

FastAPI with Uvicorn for the backend, Jinja2 templates for the prediction UI, and Docker for deployment on Hugging Face Spaces.

I picked FastAPI over Flask because async request handling means one slow SHAP computation doesn't block the whole server, and Pydantic models validate incoming JSON without extra code. The OpenAPI docs at `/docs` come free, which is handy for testing.

### Model serving

The model loads once through a `visaModel` wrapper (preprocessing + classifier) and is cached as a class variable. The SHAP explainer is cached the same way after first use. No repeated deserialization.

### Training pipeline

The full pipeline runs 5 stages in sequence:

```
DataIngestion → DataValidation → DataTransformation → ModelTrainer → ModelEvaluation
```

Each stage writes timestamped artifacts under `artifact/<timestamp>/`. The `ModelEvaluation` stage compares the new model against the existing production model and only promotes it if F1 improves by at least 0.07, which prevents regressions during retraining.

## Ethical considerations

### Continent as a feature

The model uses `continent` (applicant's origin) as input, which is effectively a proxy for nationality. I went back and forth on this.

I kept it because removing it would reduce accuracy without actually removing the bias; education and wage partially encode the same information anyway. Instead I leaned on transparency: SHAP explanations surface when continent influenced a prediction, so users can evaluate the reasoning rather than accept it at face value.

Worth saying directly: the model reflects historical DOL patterns, which may contain systemic biases. It should not be used as a decision-making tool, only as an informational aid.

### Other concerns

The UI states plainly that this is informational, not legal advice. I hosted the tool for free so it doesn't add to the information asymmetry. Feedback loops are worth watching, though: if attorneys selectively file "likely certified" cases, the training data could reinforce existing biases over time.

## Design decisions

| Decision | Chosen | Alternative | Why |
|----------|--------|-------------|-----|
| Model family | Tree-based (GBM) | Deep learning | 25K records too small for NNs; exact SHAP explanations |
| Imbalance handling | Natural distribution + threshold | SMOTEENN | Resampling degraded generalization |
| Primary metric | Accuracy + recall constraint | F1 | F1 alone caused over-prediction of denials |
| Backend | FastAPI | Flask | Async, Pydantic validation, less boilerplate |
| Deployment | Docker + HF Spaces | AWS | Free hosting, simpler for demo purposes |

## What I learned

Class imbalance doesn't always need resampling. SMOTEENN looked great in cross-validation but fell apart on held-out data. Training on real data and adjusting the threshold worked better in practice. I spent a lot of time on SMOTEENN before accepting this.

Building the SHAP feature mapping showed me how messy explainability gets once you leave the notebook. The gap between a SHAP summary plot and an explanation a user can act on is mostly engineering, not research.

The modular pipeline paid for itself during iteration. When I needed to swap encoding strategies or add drift detection, I could modify one component without touching anything else. Config/artifact interfaces kept the boundaries clean.

## Links

- [Live Demo](https://huggingface.co/spaces/TayyabManan/visa_prediction)
- [Source Code](https://github.com/TayyabManan/US-Visa-Prediction)
- [Project Page](/projects/us-visa-prediction)
