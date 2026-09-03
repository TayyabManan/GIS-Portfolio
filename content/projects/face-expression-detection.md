---
slug: "face-expression-detection"
title: "Face Expression Detection"
subtitle: "Deep Learning Emotion Recognition in Group Photos"
description: "A PyTorch and Flask web app that finds every face in a photo and classifies its expression into one of 7 emotions. ResNet-18 fine-tuned on the RAF-DB dataset, 80% accuracy."
category: "Computer Vision"
metric: "80% acc · 7 classes"
metricChart: "accuracy"
techStack: ["Python", "PyTorch", "Flask", "MTCNN", "OpenCV", "ResNet-18", "Docker", "Hugging Face"]
image: "/projects/face-expression-detection.webp"
demoUrl: "https://huggingface.co/spaces/TayyabManan/face-expression-detection"
githubUrl: "https://github.com/TayyabManan/Face-Expression-Detection"
featured: false
date: "2025-12-08"
---

## Overview
A deep learning web app that detects and classifies facial expressions in images. Built with PyTorch and Flask, using a ResNet-18 model trained on the [RAF-DB dataset](http://www.whdeng.cn/raf/model1.html) at 80% accuracy.

**[Read the full write-up →](/blog/building-face-expression-detection)**

![the model reading a group · 8 faces, all 7 classes · 85–92% confidence](/projects/screens/face-expression-detection.webp "app")

## Features
The model classifies 7 expressions: Surprise, Fear, Disgust, Happiness, Sadness, Anger, and Neutral. It handles multiple faces in a single image, using MTCNN as the primary detector with a Haar Cascade fallback for the hard cases. The app returns the annotated image with bounding boxes and emotion labels, plus the full probability distribution across all 7 classes for each face. There's a dark/light toggle, and the layout works on desktop and mobile.

## What I did

### Face detection pipeline
A two-stage approach with MTCNN as the primary face detector and Haar Cascade as fallback. MTCNN handles multiple faces in group photos well, and Haar Cascade picks up faces that MTCNN misses (unusual angles, extreme lighting).

### Model training
Transfer learning with ResNet-18 pretrained on ImageNet and fine-tuned on RAF-DB (Real-world Affective Faces Database), which has 15,339 images across 7 emotion classes. The custom classification head uses batch normalization and dropout for regularization.

### Handling class imbalance
RAF-DB has serious class imbalance (Happiness: 39%, Fear: 2.3%). I tried focal loss, class weights, and weighted sampling to improve performance on minority classes like Fear and Disgust. An ensemble of models trained with different loss functions ended up working best.

### Web application
A Flask app with image upload, emotion detection, and annotated output showing bounding boxes and confidence scores. Deployed on Hugging Face Spaces using Docker.

## Stack

| Component | Technology |
|-----------|-----------|
| Model | ResNet-18 (transfer learning from ImageNet) |
| Face Detection | MTCNN + Haar Cascade fallback |
| Backend | Flask + Gunicorn |
| Frontend | Vanilla JS with CSS animations |
| Dataset | RAF-DB (Real-world Affective Faces Database) |
| Deployment | Docker on Hugging Face Spaces |

## Model performance

| Metric | Value |
|--------|-------|
| Accuracy | 80% |
| Dataset | RAF-DB |
| Architecture | ResNet-18 |
| Input Size | 100x100 |

### Per-class performance

| Emotion | Performance | Notes |
|---------|-------------|-------|
| Happiness | Highest | Largest class in dataset |
| Neutral | High | Well-represented class |
| Surprise | Good | Distinctive facial features |
| Sadness | Moderate | Subtle expressions |
| Anger | Moderate | Often confused with intense expressions |
| Fear | Lower | Only 2.3% of training data |
| Disgust | Lower | Only 5% of training data |

## Authors
- Muhammad Tayyab
- Syed Measum
- Mustafa Rahim

## Acknowledgments
- RAF-DB Dataset for training data
- facenet-pytorch for MTCNN implementation
- PyTorch for the deep learning framework
