---
slug: "ev-analysis"
title: "EV Suitability Analysis"
subtitle: "Geospatial Analysis for EV Infrastructure Planning"
description: "Multi-criteria site selection for EV charging stations in Lahore: weighted scoring over census, OpenStreetMap, and infrastructure data to rank candidate locations across the city's 5 tehsils."
category: "Geospatial AI"
metric: "90%+ coverage"
metricChart: "coverage"
techStack: ["Python", "QGIS", "ArcGIS", "Open Street Map", "Demographic Data"]
image: "/projects/ev-analysis.webp"
demoUrl: "https://ev-analysis.netlify.app/"
githubUrl: "https://github.com/TayyabManan/ev-suitability-analysis"
featured: false
date: "2024-11-20"
---

## Overview
A geospatial analysis of where to put EV charging stations in Lahore. It scores and ranks candidate sites across the city's 5 tehsils with multi-criteria decision analysis, combining demographic data, economic indicators, infrastructure networks, and spatial analysis into a single weighted score.

![the site-selection map · 10 ranked sites across 3 rollout phases](/projects/screens/ev-analysis.webp)

## What it does
The scoring model weights population at 30%, growth at 20%, accessibility at 25%, infrastructure at 15%, and economic factors at 10%, and the weights are tunable. Inputs are the 2023 Pakistan Census, OpenStreetMap, and administrative boundaries. The output is an interactive map of suitability scores and ranked results: 5 priority sites, a 3-phase deployment plan, and a 90%+ coverage target. The whole thing is a Python pipeline that can be rerun when the data changes.

## Technical architecture
A Python geospatial pipeline using GeoPandas and Shapely for spatial operations, NumPy for numerical work, and Folium for the interactive maps. The OpenStreetMap Overpass API pulls infrastructure data. The core algorithm is multi-criteria decision analysis (MCDA) with a weighted linear combination for site scoring. The frontend is HTML/JavaScript for browsing the ranked results, and CSV/JSON interchange keeps the analysis reproducible. Demographics come from the 2023 Pakistan Census, road and infrastructure networks from OpenStreetMap, and tehsil boundaries from administrative boundary data.

## What I learned

### Spatial analysis
Combining census data, OpenStreetMap extracts, and administrative boundaries with different coordinate reference systems was the recurring headache; geospatial work lives and dies by CRS handling and data quality. Working across QGIS and ArcGIS showed me where each is stronger for spatial analysis. GeoPandas and Shapely covered the spatial joins and geometry, the Overpass API pulled real-world infrastructure data, and Folium turned out to be the right tool for showing ranked sites to people who don't use GIS.

### Weighting trade-offs
The hard part was the weights, not the code. There is no objectively correct balance between population, growth, accessibility, infrastructure, and economic factors, so the scoring has to be tunable and the choices explained. I also had to check the algorithm's picks against reality: whether a site has available land or grid capacity can override a top score. Accessibility and equity matter as much as the optimization number, and the gap between what a model recommends and what is buildable is where the project got its weight.

## What's next
Deep learning for demand prediction, running the pipeline on other Pakistani cities, and real-time traffic data for dynamic re-scoring are the obvious next steps. Further out: ROI estimates from economic feasibility modelling, grid capacity analysis for load balancing, and satellite imagery for validating sites automatically.
