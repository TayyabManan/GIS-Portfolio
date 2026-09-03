---
slug: "watertrace"
title: "WaterTrace Pakistan"
subtitle: "Groundwater Prediction Using Satellite Data and ML"
description: "Groundwater monitoring and forecasting for all 145 districts of Pakistan, built on 22 years of GRACE and GLDAS satellite data (2002-2024). Gradient Boosting time-series model (R²=0.89), interactive district-level maps, and a Flask prediction API."
category: "Geospatial AI"
metric: "R² 0.65→0.89"
metricChart: "scatter-fit"
techStack: ["React", "Flask", "Pandas", "Scikit-learn", "Google Earth Engine", "Leaflet", "Recharts", "Tailwind CSS"]
image: "/projects/watertrace.webp"
demoUrl: "https://watertrace.vercel.app"
githubUrl: "https://github.com/TayyabManan/WaterTrace"
featured: true
date: "2025-01-09"
---

## Overview
WaterTrace predicts and monitors groundwater levels across Pakistan. It processes 22 years of satellite data from NASA's [GRACE mission](https://grace.jpl.nasa.gov/) (2002-2017) and [GLDAS land surface models](https://ldas.gsfc.nasa.gov/gldas) (2018-2024) to forecast groundwater depletion across all 145 districts. The model reaches R²=0.89, and the results are served through a web dashboard with district-level maps and time-series charts.

**[Read the full write-up →](/blog/building-watertrace)**

![the live dashboard · 22-year anomaly series, observed to predicted · 145 districts](/projects/screens/watertrace.webp "app")

## What it does
It combines GRACE gravity-anomaly data and GLDAS soil-moisture measurements across 22 years, and a Gradient Boosting model (R² = 0.89) forecasts 6 months ahead for each of the 145 districts, with confidence intervals. The dashboard shows 22-year time-series charts with a data-source indicator on each, plus district maps, and it works on mobile. A REST API exposes the predictions and the underlying data.

## Stack
The frontend is React 18 with Recharts for time-series charts. Flask serves the ML API. Pandas and NumPy handle feature engineering and data processing. Google Earth Engine provides the satellite datasets, and Scikit-learn runs the regression modelling, cross-validation, and hyperparameter tuning. District maps with depletion overlays are rendered with Leaflet. Tailwind CSS handles the responsive layout.

## Satellite data sources

| Source | Details |
|--------|---------|
| GRACE Satellites (2002-2017) | Direct groundwater measurements via gravity anomalies |
| GLDAS V021 (2018-2024) | Deep soil moisture (100-200cm) as groundwater proxy |
| Temporal Resolution | Monthly aggregated data points |
| Spatial Coverage | All of Pakistan with district-level aggregation |
| Data Volume | 163 GRACE observations + 72 GLDAS measurements |

## Findings

| Metric | Value |
|--------|-------|
| Total groundwater loss (2002-2017) | 13.71 cm |
| Average depletion rate | 0.81 cm/year (p-value < 0.001) |
| Worst-hit areas | Quetta (-15.3 cm), Lahore (-12.5 cm), Punjab belt |
| Recent trend (GLDAS era) | +1.5 kg/m²/year improvement in some regions |
| Districts in critical stress | 15+ |

## ML pipeline

| Component | Details |
|-----------|---------|
| Feature Engineering | Lag features (1-12 months), seasonal sine/cosine transforms, rolling means, spatial features, trend coefficients |
| Models Compared | Linear Regression (R²=0.71), Random Forest (R²=0.84), Gradient Boosting (R²=0.89) |
| Validation | Time-series cross-validation (5 splits, chronological) to prevent leakage |
| Performance | RMSE = 0.67 cm, MAE = 0.52 cm, R² = 0.89 |
| Prediction Horizon | 6 months ahead with confidence intervals |
| Interpretability | SHAP values for feature importance |

## What I learned

### Satellite data engineering
Merging 22 years of data from two sources with different formats and temporal coverage was the first real problem. GRACE gives gravity anomalies through 2017; GLDAS gives deep soil moisture from 2018, which only works as a groundwater proxy after correlation analysis and calibration. Aggregating pixel-level rasters to irregular district boundaries was fiddly, and Google Earth Engine meant learning to process data I never downloaded. Getting the pipeline to handle 145 districts across 235 monthly observations without being painfully slow took work too. Most of the project's time went into this stage, which turned out to be normal rather than a sign something was wrong.

### Forecasting
Model performance went from R² 0.65 to 0.89 almost entirely through feature engineering (lag variables, seasonal sine/cosine terms, rolling means), not through swapping algorithms. Temporal cross-validation mattered more than I expected: random splits leak future information into training, so the chronological splits are the only scores I trust. Monsoon seasonality and irrigation cycles, domain facts rather than ML ones, were the features that moved the number.

### Communicating uncertainty
I came in knowing ML but not hydrology. Building a tool that could feed into policy decisions changed how the outputs are presented: confidence intervals instead of point estimates, district maps instead of tables, and a data-source indicator on every chart so nobody mistakes a GLDAS proxy for a GRACE measurement.

## What's next
Integrating GRACE Follow-On (GRACE-FO) data for direct measurements beyond 2018, trying LSTM and Transformer architectures for multi-step forecasting, and adding real-time climate data (temperature, rainfall) as model inputs. I'd also like a district-level alert system for sudden depletion events, and an MLOps pipeline that retrains automatically as new satellite data lands.
