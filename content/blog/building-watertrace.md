---
slug: "building-watertrace"
title: "Building WaterTrace: ML-Powered Groundwater Prediction Using 22 Years of Satellite Data"
description: "Technical deep-dive into building a geospatial AI system for groundwater monitoring in Pakistan. From processing NASA satellite data to deploying time-series ML models achieving R²=0.89 accuracy."
date: "2025-01-20"
author: "Tayyab Manan"
category: "Machine Learning"
tags: ["Machine Learning", "Geospatial AI", "Python", "Flask", "Google Earth Engine", "Time Series", "React", "Data Science"]
image: "/projects/watertrace.webp"
readTime: "12 min read"
---

# Building WaterTrace: ML-Powered Groundwater Prediction Using Satellite Data

Pakistan faces a critical water crisis. Groundwater levels are depleting at alarming rates, agricultural regions are experiencing severe water stress, and policymakers lack the predictive tools needed for proactive resource management. Cities like Quetta and Lahore have lost over 15 cm of groundwater in just 15 years.

I built **WaterTrace** to address this challenge through machine learning and geospatial analysis. The platform processes 22 years of satellite data (2002-2024) from NASA's GRACE mission and GLDAS models to predict groundwater trends across all 145 districts of Pakistan with 89% accuracy.

## The Problem: Data-Driven Water Management

Water scarcity isn't a future problem; it's happening now. Pakistan ranks among the world's most water-stressed countries, yet groundwater monitoring relies on sparse ground-based measurements that are expensive, inconsistent, and lack comprehensive spatial coverage.

The questions that drove this project:
- Can we use satellite data to monitor groundwater at scale?
- How accurately can machine learning predict depletion trends?
- Can we build a system that makes complex geospatial data accessible to policymakers and researchers?

This presented both an urgent environmental challenge and an excellent opportunity to apply geospatial AI techniques to real-world problems.

## Technical Architecture and Data Sources

The system architecture combines multiple technologies, each chosen for specific capabilities in handling large-scale geospatial data and ML workflows.

### Satellite Data Integration

The foundation of WaterTrace is 22 years of satellite observations from two complementary sources:

**GRACE Satellites (2002-2017)** provide direct groundwater measurements through gravity anomaly detection. The GRACE twin satellites measure tiny variations in Earth's gravitational field caused by changes in water mass. When groundwater depletes, the local gravitational field weakens—a phenomenon GRACE can detect with remarkable precision.

**GLDAS Land Surface Models (2018-2024)** serve as a groundwater proxy after GRACE's mission ended. GLDAS provides deep soil moisture measurements (100-200cm depth) that correlate strongly with groundwater levels. While not direct measurements like GRACE, GLDAS offers continuous temporal coverage with monthly resolution.

The challenge was merging these heterogeneous data sources into a unified dataset that ML models could learn from effectively.

### Tech Stack Selection

**Google Earth Engine** handles the heavy lifting of geospatial data processing. Rather than downloading terabytes of satellite imagery, Earth Engine's cloud-based platform processes data where it lives—Google's data centers. I wrote Python scripts using the `ee` API to filter, aggregate, and export district-level statistics from pixel-level satellite observations.

**Flask** provides a lightweight ML API backend. The Flask server handles prediction requests, loads trained Scikit-learn models, processes input features, and returns forecasts with confidence intervals. Flask's simplicity allowed rapid iteration during development while remaining production-ready.

**React 18 with Recharts** powers the frontend visualization layer. The dashboard needed to make 22 years of temporal data comprehensible at a glance. Recharts provided the flexibility to build custom time-series visualizations with interactive tooltips, zoom capabilities, and responsive design.

**Leaflet** renders the interactive district map with color-coded groundwater stress indicators. The GeoJSON district boundaries overlay groundwater depletion data, providing an intuitive geographic interface for exploring regional patterns.

**Pandas and NumPy** enable efficient data manipulation and feature engineering. Working with 235 monthly observations across 145 districts (34,075 data points) required optimized array operations that NumPy excels at.

**Scikit-learn** implements the ML pipeline: preprocessing, model training, cross-validation, and hyperparameter tuning. I compared Linear Regression, Random Forest, and Gradient Boosting models before selecting an ensemble approach that leverages strengths of each.

## Building the Data Pipeline

### Geospatial Data Processing

The first major challenge was transforming raw satellite raster data into district-level features suitable for ML training.

Google Earth Engine provided access to the datasets, but extracting meaningful statistics required careful spatial aggregation:

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

This approach processes over 163 GRACE images and 72 GLDAS images, computing spatial averages for each of Pakistan's 145 administrative districts. The result: a clean tabular dataset with columns for district ID, date, and groundwater measurements.

### Handling Data Gaps and Discontinuities

GRACE had a mission gap from June 2017 to May 2018 before the GRACE-FO follow-on mission launched. Meanwhile, GLDAS continued uninterrupted. This created a methodological challenge: how to maintain prediction continuity across different data sources?

I addressed this by:

1. **Correlation Analysis** - Validated that GLDAS soil moisture correlates strongly (r=0.78) with GRACE groundwater measurements during their overlap period (2002-2017)
2. **Calibration** - Applied a linear transformation to GLDAS values to match GRACE's scale: `GLDAS_calibrated = 0.85 × GLDAS + offset`
3. **Uncertainty Quantification** - Increased prediction confidence intervals for post-2017 forecasts to reflect the proxy data limitation

The transition isn't perfect, but validation showed prediction errors remained within acceptable bounds (RMSE < 0.7 cm).

## Machine Learning Implementation

### Feature Engineering for Time-Series Prediction

Raw satellite measurements alone aren't sufficient for accurate forecasting. The ML model needed features that capture temporal patterns, seasonality, and spatial context.

I engineered several feature categories:

**Temporal Features** capture time-based patterns:
- Year, month, and season (winter/summer monsoon cycles)
- Days since baseline (2002-01-01)
- Lag features: groundwater levels from previous 1, 3, 6, and 12 months

**Trend Features** quantify long-term changes:
- Rolling means over 6-month and 12-month windows
- Linear trend coefficient for each district
- Rate of change (first derivative)

**Seasonal Features** model monsoon-driven patterns:
- Sine and cosine transformations of month (captures cyclical nature)
- Historical monthly averages for each district
- Deviation from seasonal baseline

**Spatial Features** incorporate geographic context:
- District latitude/longitude (centroids)
- Neighboring district averages (spatial autocorrelation)
- Distance from major rivers (Indus, Chenab, Ravi)

This feature engineering increased model R² from 0.65 to 0.89, demonstrating that domain knowledge significantly improves ML performance.

### Model Development and Validation

The ML pipeline follows best practices for time-series forecasting to prevent data leakage and ensure realistic performance estimates.

**Time-Series Cross-Validation** splits data chronologically rather than randomly. The model trains on historical data (2002-2019) and validates on recent data (2020-2024). This simulates real-world deployment where the model predicts future conditions based on past observations.

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

**Model Comparison** evaluated three algorithms:

- **Linear Regression** (R² = 0.71): Fast, interpretable, but struggles with non-linear seasonal patterns
- **Random Forest** (R² = 0.84): Captures non-linearity well, but prone to overfitting on temporal features
- **Gradient Boosting** (R² = 0.89): Best performance through sequential error correction, selected for production

**Hyperparameter Tuning** used grid search with cross-validation to optimize model configuration:

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

The final production model achieved:
- **R² = 0.89** (89% of groundwater variance explained)
- **RMSE = 0.67 cm** (typical prediction error)
- **MAE = 0.52 cm** (average absolute error)

### Model Interpretation with SHAP

Understanding what drives model predictions is crucial for building trust with domain experts and policymakers. I used SHAP (SHapley Additive exPlanations) to explain individual predictions:

```python
import shap

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Visualize feature importance
shap.summary_plot(shap_values, X_test, feature_names=feature_names)
```

The SHAP analysis revealed that:
- **Lag features** (previous months' measurements) contribute 45% of prediction power
- **Seasonal indicators** account for 25%, capturing monsoon cycles
- **Spatial features** (neighboring districts) provide 15%, confirming spatial autocorrelation
- **Long-term trends** explain the remaining 15%

This interpretability helps validate that the model learns meaningful patterns rather than spurious correlations.

## Frontend Development and Visualization

### Interactive Time-Series Dashboard

The dashboard needed to communicate 22 years of complex geospatial data to audiences with varying technical backgrounds. I focused on progressive disclosure: overview first, details on demand.

The main time-series chart visualizes the complete dataset with clear visual indicators:

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

Color coding distinguishes data sources: blue for GRACE observations, green for GLDAS measurements, orange for ML predictions. The dashed styling for future predictions signals uncertainty.

### Geospatial Visualization with Leaflet

The district map provides spatial context for temporal trends. Districts are color-coded by depletion severity using a diverging color scheme:

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

Clicking a district loads its historical data into the time-series chart, creating seamless interaction between spatial and temporal visualizations.

## Performance Optimization and Deployment

### API Response Time Optimization

The initial Flask API response time for prediction requests exceeded 2 seconds—unacceptable for interactive web applications. The bottleneck: loading the Scikit-learn model from disk on every request.

**Solution: Model Caching**

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

This reduced response time to 120ms—a 94% improvement. The model loads once on server startup and remains in memory.

### Hosting Challenges: From Render to Cloudflare

The deployment journey revealed important lessons about hosting ML APIs in production.

**Initial Deployment on Render**

I initially deployed the Flask API on Render's free tier. The setup was straightforward, the deployment pipeline worked smoothly, and everything seemed perfect—until users started experiencing inconsistent performance.

The problem: **cold starts**. Render's free tier puts inactive services to sleep after 15 minutes of no requests. When a user visited WaterTrace after a period of inactivity, the first API request would trigger the server to wake up, causing response times to spike to 30-45 seconds. The ML model needed to load, dependencies had to initialize, and only then could predictions be served.

This created a terrible user experience. The interactive charts would hang, users would assume the site was broken, and many would leave before the data loaded. Even worse, the unpredictability made debugging difficult—sometimes the site was snappy (warm server), sometimes unusable (cold start).

**Migration to Cloudflare Workers**

I migrated the API to Cloudflare Workers, which fundamentally changed the architecture:

- **No cold starts**: Cloudflare's edge network keeps workers warm globally
- **Geographic distribution**: Requests route to the nearest edge location, reducing latency
- **Instant scaling**: Automatically handles traffic spikes without manual intervention
- **Consistent performance**: 120-180ms response times regardless of usage patterns

The migration required refactoring the Flask API into Cloudflare Workers' runtime, but the user experience improvement justified the effort. Users in Lahore, Karachi, and Islamabad now get sub-200ms response times consistently.

The lesson: for ML APIs serving interactive applications, consistent low latency matters more than absolute minimum latency. A system that's always 150ms beats one that's sometimes 80ms and sometimes 35,000ms.

### Frontend Bundle Size Reduction

The initial React bundle size was 850KB gzipped, causing slow initial page loads, especially on mobile connections.

**Code Splitting by Route**

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

**Chart Library Optimization**

Recharts is powerful but large. I implemented dynamic imports for chart components:

```typescript
const LineChart = lazy(() =>
  import('recharts').then(mod => ({ default: mod.LineChart }))
)
```

Combined optimizations reduced the initial bundle to 320KB gzipped—a 62% improvement. First Contentful Paint dropped from 3.8s to 1.4s on 3G connections.

## Key Insights from Development

### Domain Knowledge is Non-Negotiable

My initial model ignored monsoon seasonality, treating all months equally. The predictions were technically sound but practically useless—they failed to capture the dramatic July-August groundwater recharge from summer rains.

Consulting hydrology papers and Pakistan Meteorological Department reports revealed the critical importance of:
- Summer monsoon recharge (June-September)
- Winter dry season depletion (November-March)
- Agricultural irrigation cycles
- Regional climate variations

Incorporating this domain knowledge through seasonal features improved model R² by 0.18—more than any algorithm optimization.

### Data Quality Trumps Model Complexity

I spent weeks experimenting with advanced architectures: LSTM networks, attention mechanisms, transformer-based models. The improvements were marginal (R² increased from 0.89 to 0.91) while training time increased 20x and model interpretability decreased significantly.

Meanwhile, identifying and correcting data quality issues—removing outliers from sensor malfunctions, handling missing values properly, validating district boundary alignments—yielded larger gains with simpler models.

The lesson: sophisticated models can't compensate for noisy data. Data cleaning and feature engineering deserve more attention than architecture experimentation.

### Uncertainty Quantification Builds Trust

Early versions reported predictions as single point estimates: "District X will have -12.3 cm groundwater in 6 months." This precision was misleading and problematic for decision-makers.

Adding confidence intervals transformed perception: "District X will have -12.3 cm ± 2.1 cm (95% CI)." This honest uncertainty acknowledgment increased trust among policymakers who understand that environmental predictions inherently contain uncertainty.

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

### Real-World ML is Iterative

The final model is version 17. The first 16 iterations taught me:
- Version 1-3: Learn the problem domain and data characteristics
- Version 4-8: Experiment with feature engineering approaches
- Version 9-12: Compare model architectures and hyperparameters
- Version 13-15: Optimize for production deployment and inference speed
- Version 16: Address edge cases discovered in user testing
- Version 17: Current production model with ongoing monitoring

ML projects aren't linear progressions from problem to solution. They're iterative cycles of experimentation, failure analysis, and refinement.

## What WaterTrace Delivers Today

The production system is live at [watertrace.vercel.app](https://watertrace.vercel.app), providing several key capabilities:

**District-Level Groundwater Monitoring** - Interactive visualizations for all 145 districts showing 22-year historical trends from satellite data, with real-time filtering and comparison tools.

**ML-Powered Forecasts** - 6-month ahead predictions with confidence intervals, helping anticipate water stress before it becomes critical.

**Geospatial Analysis** - Color-coded district maps revealing regional patterns, critical stress zones, and spatial clusters of depletion.

**Statistical Dashboards** - Key metrics including total depletion, depletion rates, trend analysis, and district rankings by severity.

**RESTful API** - Programmatic access for researchers and policy tools to integrate WaterTrace data and predictions.

**Export Capabilities** - Download functionality for further analysis in GIS software, statistical tools, or policy documents.

The platform has revealed concerning patterns:
- **13.71 cm total groundwater loss** nationally from 2002-2017
- **0.81 cm/year average depletion rate** with high statistical significance
- **15+ districts in critical stress** requiring immediate intervention
- **Quetta showing -15.3 cm depletion**, the worst in Pakistan
- **Punjab agricultural belt** experiencing severe water stress

But also some encouraging trends:
- **Recent stabilization** in some northern districts
- **Improved management** in Sindh showing depletion slowdown
- **Data-driven policies** beginning to influence resource allocation

## Future ML Enhancements

As I continue exploring advanced ML techniques in my AI Engineering studies, several enhancements are planned:

**Deep Learning for Time-Series** - LSTM and Transformer architectures to capture complex temporal dependencies that gradient boosting may miss. Initial experiments with LSTM show promise for multi-step ahead forecasting.

**Multi-Modal Data Fusion** - Integrate climate data (temperature, rainfall, evapotranspiration), socioeconomic indicators (population density, agricultural activity), and infrastructure data (tube wells, canal systems) for holistic predictions.

**Anomaly Detection** - Identify unusual depletion events using autoencoders and isolation forests. This enables early warning systems for sudden groundwater crises.

**Causal Inference** - Move beyond correlation to understand causal mechanisms. Does agricultural expansion drive depletion, or are both responding to climate patterns? Causal ML methods like DoWhy and EconML can help answer these questions.

**Reinforcement Learning for Policy Optimization** - Simulate water management interventions (canal projects, agricultural restrictions, tube well regulations) and use RL to recommend optimal policy combinations that balance multiple objectives.

**Explainable AI** - Enhance SHAP analysis with LIME and counterfactual explanations. Policymakers need to understand not just what the model predicts, but why, and what interventions might change the outcome.

**Real-Time GRACE-FO Integration** - The GRACE Follow-On mission provides current direct measurements. Automating data ingestion and model retraining enables truly real-time monitoring.

## Key Takeaways from Building WaterTrace

**ML is a Tool, Not a Solution** - The technology enables better decision-making, but solving Pakistan's water crisis requires policy action, infrastructure investment, and behavioral change. WaterTrace provides data; humans must act on it.

**Geospatial AI Requires Different Skills** - Success demands hybrid expertise: ML fundamentals, geospatial analysis, domain knowledge, and software engineering. No single discipline is sufficient.

**Start Simple, Iterate Based on Need** - Linear regression with good features outperforms complex architectures with poor features. Add complexity only when simpler approaches fail and you understand why.

**Open Data Enables Innovation** - This project exists because NASA makes GRACE and GLDAS data freely accessible. Open science accelerates progress on global challenges.

**Stakeholder Feedback Shapes Priorities** - Initial versions focused on technical metrics (R², RMSE). User feedback redirected priorities to uncertainty quantification, interpretability, and actionable insights.

## Project Links

- **Live Platform**: [watertrace.vercel.app](https://watertrace.vercel.app)
- **Source Code**: [GitHub Repository](https://github.com/TayyabManan/WaterTrace)
- **Project Details**: [WaterTrace Project Page](/projects/watertrace)

For technical questions about the ML pipeline, geospatial data processing, or collaboration opportunities, feel free to [reach out](/contact).
