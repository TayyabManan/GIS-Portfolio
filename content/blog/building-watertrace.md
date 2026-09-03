---
slug: "building-watertrace"
title: "WaterTrace: Predicting Pakistan's Groundwater from 22 Years of Satellite Data"
seoTitle: "WaterTrace: ML Groundwater Prediction"
description: "A geospatial AI system for groundwater monitoring in Pakistan: NASA satellite data processed into time-series ML models that reach R²=0.89, served through district-level maps."
date: "2025-01-20"
author: "Tayyab Manan"
category: "Machine Learning"
tags: ["Machine Learning", "Geospatial AI", "Python", "Flask", "Google Earth Engine", "Time Series", "React", "Data Science"]
image: "/projects/watertrace.webp"
readTime: "12 min read"
faqs:
  - question: "How accurate is WaterTrace's groundwater prediction?"
    answer: "The production Gradient Boosting model reaches R²=0.89 (RMSE 0.67 cm) across all 145 districts of Pakistan, validated with chronological time-series cross-validation that trains on 2002-2019 and tests on 2020-2024."
  - question: "What satellite data does WaterTrace use?"
    answer: "22 years of data (2002-2024): NASA GRACE gravity-anomaly measurements through 2017, then GLDAS deep soil-moisture models as a groundwater proxy, calibrated to GRACE's scale (they correlate at r=0.78 during the overlap)."
  - question: "Why Gradient Boosting instead of an LSTM or Transformer?"
    answer: "Gradient Boosting hit R²=0.89 with fast, interpretable inference. Deep architectures only nudged R² to 0.91 while training 20x slower and losing the SHAP interpretability policymakers needed to trust the forecasts."
  - question: "What made the biggest difference to accuracy?"
    answer: "Domain-driven feature engineering, not the algorithm. Adding monsoon seasonality plus lag, trend, and spatial features lifted R² from 0.65 to 0.89, a bigger gain than any model swap."
---

Pakistan has a serious water problem. Groundwater levels are dropping, agricultural regions are under water stress, and policymakers don't have the predictive tools to get ahead of it. Cities like Quetta and Lahore have lost over 15 cm of groundwater in 15 years.

I built WaterTrace to see how far ML and satellite data could get toward fixing that. It processes 22 years of data (2002-2024) from NASA's [GRACE mission](https://grace.jpl.nasa.gov/) and [GLDAS models](https://ldas.gsfc.nasa.gov/gldas) to predict groundwater trends across all 145 districts of Pakistan with 89% accuracy.

![the live dashboard · 22-year anomaly series, observed to predicted · 145 districts](/projects/screens/watertrace.webp "app")

## Why satellite data

Water scarcity in Pakistan isn't hypothetical. The country ranks among the world's most water-stressed, yet groundwater monitoring relies on scattered well readings that are expensive, inconsistent, and cover too little ground. Satellites pass over the whole country every month.

I wanted to answer a few specific questions. Can satellite data monitor groundwater at scale? How accurately can ML predict depletion trends? And can the results be made readable by people who aren't remote sensing experts?

## Architecture and data sources

### Two satellite sources

The 22 years of observations come from two sources.

GRACE (2002-2017) measures groundwater directly through gravity anomalies. The twin GRACE satellites detect tiny variations in Earth's gravitational field caused by changes in water mass. When groundwater depletes, the local gravitational field weakens, and GRACE can pick that up with surprising precision.

GLDAS land surface models (2018-2024) stand in for GRACE after its mission ended. GLDAS provides deep soil moisture (100-200cm depth) that correlates well with groundwater levels. It isn't a direct measurement, but it gives continuous monthly coverage.

Merging the two into one dataset a model could learn from was the first real problem.

### Stack

Google Earth Engine does the heavy geospatial processing. Instead of downloading terabytes of satellite imagery, Earth Engine processes data in Google's data centers. I wrote Python scripts against the `ee` API to filter, aggregate, and export district-level statistics from pixel-level observations.

Flask is the ML API backend. It handles prediction requests, loads the trained Scikit-learn models, builds input features, and returns forecasts with confidence intervals. It kept iteration fast.

The frontend is React 18 with Recharts. The dashboard needed to make 22 years of temporal data readable at a glance, and Recharts handled the custom time-series charts, tooltips, and zoom.

Leaflet renders the district map with color-coded groundwater stress indicators. GeoJSON district boundaries overlay the depletion data.

Pandas and NumPy handle data manipulation and feature engineering. 235 monthly observations across 145 districts is 34,075 data points, so I needed vectorized array operations.

Scikit-learn runs the ML pipeline: preprocessing, training, cross-validation, and hyperparameter tuning. I compared Linear Regression, Random Forest, and Gradient Boosting and shipped Gradient Boosting.

## Data pipeline

### From rasters to district rows

The first job was turning raw satellite rasters into district-level features a model could train on. Earth Engine has the datasets; getting per-district statistics out still takes some spatial aggregation:

```python
# Define Pakistan's district boundaries
districts = ee.FeatureCollection('projects/watertrace/pakistan_districts')

# Load GRACE data
grace = ee.ImageCollection('NASA/GRACE/MASS_GRIDS/MASCON')
  .filterDate('2002-01-01', '2017-12-31')
  .select('lwe_thickness')

# Aggregate to district level
def extract_district_mean(image):
  date = image.date().format('YYYY-MM')
  means = image.reduceRegions({
    'collection': districts,
    'reducer': ee.Reducer.mean(),
    'scale': 25000
  })
  return means.map(lambda f: f.set('date', date))

district_data = grace.map(extract_district_mean).flatten()
```

This runs over 163 GRACE images and 72 GLDAS images, computing a spatial mean for each of the 145 districts. The output is a table with district ID, date, and groundwater measurement.

### Bridging the GRACE-GLDAS gap

GRACE had a mission gap from June 2017 to May 2018 before GRACE-FO launched. GLDAS continued uninterrupted. So how do you keep predictions continuous across two different data sources?

I handled it in three steps. Correlation analysis first: GLDAS soil moisture correlates at r=0.78 with GRACE groundwater measurements during the overlap period (2002-2017). Then a linear calibration to put GLDAS on GRACE's scale: `GLDAS_calibrated = 0.85 × GLDAS + offset`. Then wider confidence intervals on post-2017 forecasts, because they rest on proxy data.

The transition isn't perfect, but validation showed prediction error stayed within acceptable bounds (RMSE < 0.7 cm).

## The model

### Feature engineering

Raw satellite measurements alone aren't enough. The model needed features that capture temporal patterns, seasonality, and spatial context, so each district's monthly reading got expanded into four groups.

The temporal group covers year, month, season (winter/summer monsoon cycles), days since the 2002-01-01 baseline, and lag features for groundwater levels 1, 3, 6, and 12 months back. The trend group covers rolling means over 6-month and 12-month windows, a linear trend coefficient per district, and rate of change (first derivative). The seasonal group uses sine and cosine transforms of month for the cyclical behavior, historical monthly averages per district, and deviation from the seasonal baseline. The spatial group adds district latitude/longitude centroids, neighboring-district averages (spatial autocorrelation), and distance from the major rivers (Indus, Chenab, Ravi).

This pushed R² from 0.65 to 0.89. Domain knowledge made a bigger difference than any algorithm change.

### Training and validation

Time-series cross-validation splits the data chronologically, not randomly, so future observations can't leak into training. The model trains on 2002-2019 and validates on 2020-2024, which is how it will be used in practice: predicting the future from the past.

```python
from sklearn.model_selection import TimeSeriesSplit
from sklearn.ensemble import GradientBoostingRegressor

# Temporal split: train on past, test on future
tscv = TimeSeriesSplit(n_splits=5)

for train_idx, test_idx in tscv.split(X):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]

    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    scores.append(r2_score(y_test, predictions))
```

Linear Regression reached R² = 0.71: fast and interpretable, but it can't follow the non-linear seasonal patterns. Random Forest got to 0.84 and handles the non-linearity, but tends to overfit on temporal features. Gradient Boosting reached 0.89 through sequential error correction, and that's what shipped.

Hyperparameters came from a grid search over the same time-series folds:

```python
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.05, 0.1],
    'min_samples_leaf': [5, 10, 20]
}

grid_search = GridSearchCV(
    GradientBoostingRegressor(),
    param_grid,
    cv=tscv,
    scoring='r2',
    n_jobs=-1
)
```

The production model lands at R² = 0.89 (89% of groundwater variance explained), RMSE = 0.67 cm, and MAE = 0.52 cm.

### Interpreting it with SHAP

If policymakers can't understand why the model makes a prediction, they won't trust it. I used SHAP to explain individual predictions:

```python
import shap

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Visualize feature importance
shap.summary_plot(shap_values, X_test, feature_names=feature_names)
```

The SHAP analysis showed that lag features (previous months' measurements) contribute 45% of prediction power, seasonal indicators account for 25% (the monsoon cycles), spatial features (neighboring districts) provide 15%, confirming spatial autocorrelation, and long-term trends explain the remaining 15%.

That ordering makes physical sense, which helps confirm the model is learning real patterns rather than noise.

## Frontend

### Time-series dashboard

The dashboard has to show 22 years of data to people with very different backgrounds. I went with overview first, details on demand.

The main chart shows the full series with each source styled differently:

```typescript
<ResponsiveContainer width="100%" height={400}>
  <LineChart data={districtData}>
    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
    <XAxis
      dataKey="date"
      label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
    />
    <YAxis
      label={{ value: 'Groundwater (cm)', angle: -90, position: 'insideLeft' }}
    />
    <Tooltip content={<CustomTooltip />} />
    <Legend />

    {/* GRACE data (2002-2017) */}
    <Line
      type="monotone"
      dataKey="grace"
      stroke="#3b82f6"
      strokeWidth={2}
      dot={false}
    />

    {/* GLDAS data (2018-2024) */}
    <Line
      type="monotone"
      dataKey="gldas"
      stroke="#10b981"
      strokeWidth={2}
      dot={false}
      strokeDasharray="5 5"
    />

    {/* ML predictions with confidence intervals */}
    <Line
      type="monotone"
      dataKey="prediction"
      stroke="#f59e0b"
      strokeWidth={2}
      strokeDasharray="3 3"
    />
  </LineChart>
</ResponsiveContainer>
```

Blue is GRACE, green is GLDAS, orange is the ML prediction. The dashed line on predictions is there to signal uncertainty.

### District map

The Leaflet map gives spatial context to the temporal trends. Districts are color-coded by depletion severity:

```typescript
const getColorByDepletion = (depletion: number) => {
  if (depletion < -10) return '#dc2626' // Critical (red)
  if (depletion < -5) return '#f59e0b'  // High (orange)
  if (depletion < 0) return '#fbbf24'   // Moderate (yellow)
  if (depletion < 2) return '#34d399'   // Stable (green)
  return '#10b981'                      // Improving (dark green)
}

const districtStyle = (feature: Feature) => ({
  fillColor: getColorByDepletion(feature.properties.depletion),
  weight: 1,
  opacity: 1,
  color: 'white',
  fillOpacity: 0.7
})
```

Clicking a district loads its history into the time-series chart, so the two views stay connected.

## Performance and deployment

### API response time

The first version of the Flask API took over 2 seconds per prediction request, which is too slow for an interactive app. The bottleneck was loading the Scikit-learn model from disk on every request.

The fix was to cache the model:

```python
from functools import lru_cache
import joblib

@lru_cache(maxsize=1)
def load_model():
    return joblib.load('models/groundwater_model.pkl')

@app.route('/api/predict/<district_id>')
def predict(district_id):
    model = load_model()  # Cached after first call
    features = prepare_features(district_id)
    prediction = model.predict(features)
    return jsonify({'prediction': prediction.tolist()})
```

Response time dropped to 120ms, a 94% improvement. The model loads once on startup and stays in memory.

### Render to Cloudflare

Deployment taught me what "works" actually means in production.

I first put the Flask API on Render's free tier. Setup was easy, the deploy pipeline worked, everything looked fine. Then users started complaining about inconsistent performance.

The issue was cold starts. Render's free tier puts inactive services to sleep after 15 minutes. When someone visited WaterTrace after a quiet period, the first API request would wake the server, and response times would spike to 30-45 seconds while the model loaded and dependencies initialized. The charts would hang, users would assume the site was broken, and many would leave. Sometimes the site was fast (warm server), sometimes unusable (cold start). The inconsistency made it worse than being uniformly slow.

I moved the API to Cloudflare Workers. No cold starts, because the edge network keeps workers warm. Requests route to the nearest edge location, scaling is automatic, and response times sit at 120-180ms regardless of traffic.

The migration meant refactoring the Flask API for the Workers runtime, but it was worth it. Users in Lahore, Karachi, and Islamabad now get sub-200ms responses consistently.

The lesson I took away: for ML APIs behind interactive apps, consistent latency matters more than minimum latency. A system that's always 150ms beats one that's sometimes 80ms and sometimes 35 seconds.

### Bundle size

The initial React bundle was 850KB gzipped, which meant slow page loads on mobile connections.

Code splitting by route:

```typescript
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const MapView = lazy(() => import('./pages/MapView'))
const Analytics = lazy(() => import('./pages/Analytics'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  )
}
```

Recharts components are also imported dynamically:

```typescript
const LineChart = lazy(() =>
  import('recharts').then(mod => ({ default: mod.LineChart }))
)
```

Together these brought the initial bundle down to 320KB gzipped, a 62% reduction. First Contentful Paint dropped from 3.8s to 1.4s on 3G connections.

## What actually mattered

### Domain knowledge beat model choice

My initial model ignored monsoon seasonality and treated all months equally. The predictions were technically fine but practically useless. They missed the July-August groundwater recharge from summer rains entirely.

Reading hydrology papers and Pakistan Meteorological Department reports made the problem obvious. Summer monsoon recharge (June-September), winter dry-season depletion (November-March), irrigation cycles, and regional climate differences all drive groundwater in ways the model had no way to see.

Adding that knowledge through seasonal features improved R² by 0.18. That's more than any algorithm swap gave me.

### Data quality over model complexity

I spent weeks trying fancier architectures: LSTM networks, attention mechanisms, transformer-based models. The improvements were marginal (R² went from 0.89 to 0.91) while training time increased 20x and interpretability dropped.

Meanwhile, cleaning the data (removing outliers from sensor malfunctions, handling missing values properly, validating district boundary alignments) gave bigger gains with the simpler model.

Sophisticated models can't fix noisy data. I wish I'd spent those weeks on cleaning and feature engineering instead.

### Showing uncertainty built trust

Early versions reported point estimates: "District X will have -12.3 cm groundwater in 6 months." That level of precision was misleading.

Adding confidence intervals changed how people received the results: "District X will have -12.3 cm ± 2.1 cm (95% CI)." Policymakers already know environmental predictions are uncertain. Showing that uncertainty made them trust the tool more, not less.

```python
# Generate prediction intervals using quantile regression
from sklearn.ensemble import GradientBoostingRegressor

models = {
    'lower': GradientBoostingRegressor(loss='quantile', alpha=0.05),
    'median': GradientBoostingRegressor(loss='quantile', alpha=0.50),
    'upper': GradientBoostingRegressor(loss='quantile', alpha=0.95)
}

for name, model in models.items():
    model.fit(X_train, y_train)
    predictions[name] = model.predict(X_test)
```

### Seventeen versions

The final model is version 17. Versions 1-3 were about learning the problem domain and the data. Versions 4-8 were feature engineering experiments. Versions 9-12 compared architectures and hyperparameters. Versions 13-15 optimized for production deployment and inference speed. Version 16 addressed edge cases found during user testing. Version 17 is the current production model, with ongoing monitoring.

There was no straight line from problem to solution. It was loops of trying something, seeing what broke, and fixing it.

## What it does today

The production system is live at [watertrace.vercel.app](https://watertrace.vercel.app).

It shows 22-year trends for all 145 districts, 6-month forecasts with confidence intervals, a color-coded map of regional stress zones, and summary stats (total depletion, depletion rates, district rankings). There's a REST API for researchers and policy tools, and exports for GIS software and further analysis.

The numbers aren't good. National groundwater loss from 2002-2017 totals 13.71 cm, with an average depletion rate of 0.81 cm/year. Over 15 districts are in critical stress. Quetta shows -15.3 cm depletion, the worst in Pakistan. The Punjab agricultural belt is under severe water stress.

There are a few better signs. Some northern districts have stabilized recently, parts of Sindh show a slowdown in depletion, and data is beginning to shape how resources get allocated.

## What's next

Several improvements are on my list as I continue my AI Engineering studies.

LSTM and Transformer architectures could capture temporal dependencies that gradient boosting misses; initial LSTM experiments look promising for multi-step forecasting. Multi-modal data fusion would bring in climate data (temperature, rainfall, evapotranspiration), socioeconomic indicators (population density, agricultural activity), and infrastructure data (tube wells, canal systems).

Anomaly detection with autoencoders and isolation forests would give early warning of sudden groundwater crises. Causal inference methods (DoWhy, EconML) could move past correlation to what actually drives depletion: is agricultural expansion the cause, or are both responding to climate patterns?

Reinforcement learning could simulate interventions (canal projects, agricultural restrictions, tube well regulations) and recommend policy combinations that balance multiple objectives. LIME and counterfactual explanations would help policymakers see which interventions might change an outcome. And real-time GRACE-FO integration would automate data ingestion from the ongoing GRACE Follow-On mission for continuous monitoring.

## What I took away

ML is a tool, not a solution. WaterTrace provides data, but solving Pakistan's water crisis requires policy action, infrastructure investment, and behavioral change. The technology enables better decisions; it doesn't make them.

This needed more than ML. It took geospatial analysis, some hydrology, and ordinary software engineering. No single discipline was enough on its own.

Start simple. Linear regression with good features outperformed complex architectures with poor features. I only added complexity when simpler approaches failed and I understood why.

Open data matters. This project exists because NASA makes GRACE and GLDAS data freely available. That access is easy to take for granted.

Listen to users early. My initial versions focused on technical metrics (R², RMSE). User feedback redirected me toward uncertainty quantification, interpretability, and outputs people could act on. The metrics I cared about weren't the ones that mattered to the people using it.

## Links

- Live platform: [watertrace.vercel.app](https://watertrace.vercel.app)
- Source code: [GitHub Repository](https://github.com/TayyabManan/WaterTrace)
- Project details: [WaterTrace Project Page](/projects/watertrace)

Questions about the ML pipeline or the Earth Engine side: [reach out](/contact).
