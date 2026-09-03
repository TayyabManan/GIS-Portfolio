---
slug: "us-visa-prediction"
title: "US Visa Approval Prediction"
subtitle: "ML-Powered PERM Certification Predictor with SHAP Explainability"
description: "Predicts US PERM labor certification outcomes (73.2% accuracy, 61% denied recall) and explains each prediction with SHAP. A 5-stage MLOps pipeline, GridSearchCV across 5 boosting models, threshold-tuned Gradient Boosting, and a FastAPI backend."
category: "Machine Learning & MLOps"
metric: "73.2% acc · 61% recall"
metricChart: "hbars"
techStack: ["Python", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "SHAP", "FastAPI", "Docker"]
image: "/projects/us-visa-prediction.webp"
demoUrl: "https://huggingface.co/spaces/TayyabManan/visa_prediction"
githubUrl: "https://github.com/TayyabManan/US-Visa-Prediction"
featured: true
date: "2026-04-05"
---

## Overview
When a U.S. employer wants to hire a foreign worker permanently, they file a [PERM labor certification](https://flag.dol.gov/programs/permanent) with the Department of Labor. The process is opaque, takes 6-18 months, and costs $5,000-$15,000 in legal fees. A denial means starting over.

This system predicts whether a PERM application will be certified or denied, and explains why, so applicants and attorneys can judge case strength before they file. It follows CRISP-DM and runs on a modular MLOps pipeline.

**[Read the full write-up →](/blog/building-us-visa-prediction)**

![the live predictor · 10-feature form, base rate and f1 stated up front](/projects/screens/us-visa-prediction.webp "app")

## What it does
A Gradient Boosting classifier predicts certification or denial at 73.2% accuracy. Every prediction comes with a SHAP explanation of which factors help and hurt the application, presented as strengths, weaknesses, and suggestions, plus a calibrated probability with high/moderate/low confidence bands. The decision threshold is 0.37 rather than the default 0.5, which trades 1.5% accuracy for +11% denied recall, the right trade for an advisory tool. Training runs through a 5-stage pipeline: ingestion, validation (KS drift detection), transformation, training (GridSearchCV across 5 models), and evaluation with gated promotion. When SHAP hits an edge case, a rule-based fallback supplies the explanation instead, so no prediction ships without one.

## Technical architecture
Each pipeline stage produces artifact dataclasses consumed by the next. The training pipeline evaluates Random Forest, Gradient Boosting, XGBoost, LightGBM, and CatBoost via GridSearchCV with 5-fold cross-validation, followed by a stacking ensemble and threshold tuning. The final model is promoted only if it beats the existing model's F1 by a configurable margin.

Preprocessing is a scikit-learn ColumnTransformer with ordinal encoding for ordered features, one-hot encoding for nominal features, and Yeo-Johnson power transforms for skewed numerics. The preprocessor and model are serialized together so inference matches training.

## Model performance

| Metric | Value |
|--------|-------|
| Overall accuracy | 73.2% (vs 66.8% naive baseline) |
| Denied recall | 61.4% |
| Denied F1 | 60.4% |
| Certified recall | 79.1% |
| Optimal threshold | 0.37 |

The model catches 61.4% of actual denials while keeping overall accuracy reasonable. For cases it flags as at-risk, the SHAP explanation points to the specific factors behind the call.

## Explainability with SHAP
Every prediction comes with SHAP values mapped back to the original 10 input features. Negative values are factors pushing toward certification (strengths); positive values push toward denial (weaknesses). One-hot encoded SHAP values are aggregated back to their original feature names so the output is actually readable.

## Design decisions
- Tree-based models rather than deep learning. 25K records is too small for neural networks to shine; trees consistently outperform on tabular data at this scale and allow exact SHAP explanations.
- Natural class distribution plus threshold tuning rather than SMOTEENN. Synthetic resampling degraded generalization. Training on real data and shifting the threshold afterward gave a cleaner learning signal.
- Accuracy with a denied-recall constraint rather than F1. Optimizing F1 alone led to over-predicting denials. The constraint gives better-calibrated predictions for an advisory tool.
- FastAPI rather than Flask, for async request handling, automatic Pydantic validation, and built-in OpenAPI docs with less boilerplate.

## What I learned

### ML engineering
- Threshold tuning was the most effective lever for minority-class recall without introducing resampling artifacts. Shifting the decision boundary after training is simple and it works.
- SHAP on transformed features needed a mapping layer to aggregate one-hot encoded values back to the original feature names. Without it, the explanations are useless to anyone who isn't staring at the preprocessing code.
- Pipeline modularity paid off during iteration. Each component (ingestion, validation, transformation, training, evaluation) has its own config/artifact interface, so I could debug and swap parts independently.

### Class imbalance and evaluation
- SMOTEENN looked great in cross-validation but degraded test performance. This was my clearest lesson in the gap between training metrics and deployment reality.
- Automated evaluation gates that compare against the existing production model prevent regressions during retraining. Worth setting up early.
- The 2:1 imbalance was moderate enough that native class weighting (LightGBM, CatBoost) and threshold tuning beat external resampling. Not every imbalanced dataset needs SMOTE.

### Deployment
- Docker on Hugging Face Spaces gives you containerized deployment on free infrastructure. No cloud costs for a demo.
- Loading the model once at startup and serving from a class-level cache removes the repeated deserialization overhead. Simple fix, big difference.

## What's next
Probability calibration with Platt scaling would give better-calibrated confidence scores. Adding SOC codes, NAICS industry codes, and wage ratios as features could improve accuracy. Temporal weighting would help track shifts in DOL decision patterns. Automated SHAP-based fairness auditing across model versions would catch bias drift. And scheduled retraining triggered by quarterly DOL data releases would keep the model current.
