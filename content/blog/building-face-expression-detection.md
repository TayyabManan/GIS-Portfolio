---
slug: "building-face-expression-detection"
title: "Face Expression Detection: Tackling Class Imbalance with Ensemble Learning and Cloud GPUs"
seoTitle: "Facial Expression Detection with ResNet-18"
description: "A facial expression recognition system for group photos: severe class imbalance handled with ensembles, cloud GPU training on Modal.com, and deployment on Hugging Face Spaces."
date: "2025-12-08"
author: "Tayyab Manan"
category: "Computer Vision"
tags: ["Computer Vision", "Deep Learning", "PyTorch", "Transfer Learning", "MTCNN", "Flask", "Hugging Face", "Modal.com"]
image: "/projects/face-expression-detection.webp"
readTime: "15 min read"
faqs:
  - question: "How accurate is the facial expression model?"
    answer: "The final weighted ensemble reaches 80% accuracy across 7 emotions on RAF-DB. The number I care more about is per-class recall on the rare Fear and Disgust classes, which rose from around 50% into the high-60s, so the model no longer ignores minority emotions."
  - question: "How do you handle class imbalance in emotion recognition?"
    answer: "Not with SMOTEENN. A weighted sampler for balanced batches, class weights, high dropout (0.6), label smoothing (0.15), and ensembling models trained with different losses together beat any single fix. Focal Loss alone helped the minority classes but wrecked the majority ones."
  - question: "Why ResNet-18 instead of a bigger model like EfficientNet-B2?"
    answer: "ResNet-18 generalized better on this 15,339-image dataset and outperformed the larger EfficientNet-B2. On smaller datasets the simpler model often wins, and the deeper custom classification head mattered more than backbone size."
  - question: "How much did training cost?"
    answer: "About $3.50 total. Every experiment ran on Modal.com's pay-per-use A100 GPUs, so I never needed a local GPU."
---

Facial expression recognition sounds simple until you try to build it. Humans read emotions from faces thousands of times a day without thinking about it. Getting a machine to do the same is a different problem.

I built a face expression detection system that identifies 7 emotions in group photos: Surprise, Fear, Disgust, Happiness, Sadness, Anger, and Neutral. The final model hits 80% accuracy on the [RAF-DB dataset](http://www.whdeng.cn/raf/model1.html) and is deployed as a web app on Hugging Face Spaces.

Going from baseline to something deployed taught me more about practical ML than any textbook did, mostly because textbooks don't cover the part where your second training run overwrites your first model.

![the model reading a group · 8 faces, all 7 classes · 85–92% confidence](/projects/screens/face-expression-detection.webp "app")

## Why real-world photos are hard

Most emotion recognition research uses controlled datasets: perfect lighting, frontal faces, exaggerated expressions. Group photos taken in the wild are messier. Faces come at odd angles, get partly occluded, show up small, and the expressions are subtle. The system has to find every face and then classify emotions that are often ambiguous, while the training data skews heavily toward a few common expressions like happiness.

I wanted to know whether I could reliably detect multiple faces in group photos, how to deal with severe class imbalance in emotion datasets, and where the practical trade-off sits between model complexity and accuracy.

This was a course project for Machine Learning for Engineering Design, but I wanted something I could deploy, not just something that passed.

## Architecture

The system is a two-stage pipeline: face detection first, then emotion classification on each crop. Keeping the two stages separate turned out to matter for group photos.

### Stage 1: face detection with MTCNN

MTCNN (Multi-task Cascaded Convolutional Networks) handles face detection. It's a three-stage cascade. P-Net generates candidate windows at multiple scales, R-Net refines the candidates and rejects false positives, and O-Net does the final refinement along with facial landmark localization.

```python
from facenet_pytorch import MTCNN

mtcnn = MTCNN(
    image_size=160,
    margin=0,
    min_face_size=20,
    thresholds=[0.6, 0.7, 0.7],
    factor=0.709,
    post_process=False,
    device=DEVICE,
    keep_all=True  # Detect all faces, not just the largest
)
```

I added Haar Cascade as a fallback detector. When MTCNN fails to find faces (which happens with unusual angles or extreme lighting), Haar Cascade often picks them up:

```python
def detect_faces(image):
    if MTCNN_AVAILABLE and mtcnn is not None:
        faces = detect_faces_mtcnn(image)
        if len(faces) == 0:
            faces = detect_faces_haar(image)  # Fallback
        return faces
    else:
        return detect_faces_haar(image)
```

The fallback brought detection rate from about 80% to about 95% on my test images.

### Stage 2: emotion classification with ResNet-18

For emotion classification I used transfer learning with ResNet-18 pretrained on ImageNet:

```python
class EmotionResNet(nn.Module):
    def __init__(self, num_classes=7, dropout_rate=0.5, pretrained=True):
        super(EmotionResNet, self).__init__()

        # Load pretrained ResNet-18
        weights = models.ResNet18_Weights.IMAGENET1K_V1 if pretrained else None
        self.backbone = models.resnet18(weights=weights)

        # Get features from backbone
        num_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Identity()

        # Custom classification head
        self.classifier = nn.Sequential(
            nn.Linear(num_features, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout_rate),
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout_rate),
            nn.Linear(256, num_classes)
        )
```

The custom head with BatchNorm and Dropout made a real difference. A single linear layer on top of the backbone got 75% accuracy; the deeper head with regularization pushed this to 80%.

## The dataset: RAF-DB and its imbalance

RAF-DB (Real-world Affective Faces Database) contains 15,339 images across 7 emotion classes. It's one of the more realistic emotion datasets because the images were collected from the internet rather than posed in labs.

The problem is severe class imbalance. Happiness is 39% of samples, Neutral 22%, Sadness 16%, Surprise 11%, Anger 5%, Disgust 5%, and Fear just 2.3%. A model that predicts "Happiness" for everything gets 39% accuracy without learning anything.

The obvious question is why I didn't use a more balanced dataset. We tried. We found one and emailed the researcher who maintained it to request access. Never got a response. After waiting and following up, we went ahead with RAF-DB and decided to handle the imbalance in the training procedure rather than wait indefinitely for data.

## Initial baseline: 82.14% accuracy

My starting point was a standard ResNet-18 with vanilla cross-entropy loss. Per-class accuracy: Happiness 90.9%, Surprise 84.8%, Neutral 82.6%, Sadness 77.8%, Anger 69.1%, Fear 51.4%, Disgust 50.0%.

Overall accuracy looked respectable at 82.14%, but the per-class breakdown told the real story: the model had essentially given up on Fear and Disgust. With only 2.3% of training data, Fear was barely better than random guessing.

This is what aggregate metrics hide. 82% sounds fine until you realize the model can't recognize two of seven emotions.

## Fixing severe class imbalance

No single trick fixed it. Here's what I tried, in order.

### Attempt 1: Focal Loss

Focal Loss down-weights easy examples so training focuses on hard cases. If the model confidently predicts Happiness correctly, that loss contribution shrinks. If it struggles with Fear, that signal is amplified.

```python
class FocalLoss(nn.Module):
    def __init__(self, gamma=2.0, alpha=None):
        super(FocalLoss, self).__init__()
        self.gamma = gamma
        self.alpha = alpha

    def forward(self, inputs, targets):
        ce_loss = F.cross_entropy(inputs, targets, reduction='none')
        pt = torch.exp(-ce_loss)
        focal_loss = ((1 - pt) ** self.gamma) * ce_loss
        return focal_loss.mean()
```

Results with Focal Loss:
- Overall accuracy: 64.24% (dropped hard)
- Fear: 59.5% (+8% improvement)
- Disgust: 70.6% (+20% improvement)
- Happiness: 59.5% (dropped from 90.9%)

Focal Loss did exactly what it's supposed to do for minority classes and wrecked the majority classes in the process. The model overcorrected.

### Attempt 2: class weights

Instead of modifying the loss function, I tried weighting classes by inverse frequency:

```python
def get_class_weights(labels):
    class_counts = np.bincount(labels)
    total = len(labels)
    weights = total / (len(class_counts) * class_counts)
    return torch.FloatTensor(weights)
```

This helped but wasn't enough on its own.

### Attempt 3: weighted sampling

Rather than seeing the same imbalanced distribution every epoch, a weighted sampler gives each batch roughly equal representation:

```python
def get_weighted_sampler(labels):
    class_counts = np.bincount(labels)
    weights = 1.0 / class_counts[labels]
    sampler = WeightedRandomSampler(weights, len(weights))
    return sampler
```

### The combination that worked

The final training configuration stacked several of these:

```python
# Training configuration
epochs = 100
batch_size = 64
learning_rate = 1e-4
weight_decay = 5e-3
dropout = 0.6
label_smoothing = 0.15
focal_loss_gamma = 3.0
early_stopping_patience = 25
```

What mattered most: high dropout (0.6) kept the model from overfitting to the majority classes, label smoothing (0.15) reduced overconfidence, which helped the minority classes in particular, early stopping kept it from memorizing the imbalanced distribution, and the weighted sampler kept batches balanced.

## Cloud training with Modal.com

I didn't have a local GPU, so I trained on Modal.com. Pay-per-use A100s made it cheap enough to run many experiments.

### Setting up Modal training

```python
import modal

app = modal.App("emotion-training")
volume = modal.Volume.from_name("emotion-data")

@app.function(
    gpu="A100",
    volumes={"/data": volume},
    timeout=3600
)
def train_model(model_type="resnet", use_focal_loss=False):
    # Training code here
    pass
```

### Training runs and results

- Run 1: EfficientNet-B2 + Focal Loss, 64.24% (26 min)
- Run 2: EfficientNet-B2 + Standard Loss, 73.92% (24 min)
- Run 3: ResNet-18 + Standard Loss, 78.59% (18 min)
- Ensemble: all three weighted, 78.91%

One thing that surprised me: the smaller ResNet-18 beat the larger EfficientNet-B2. It just generalized better on this dataset.

### Ensemble strategy

Simple averaging of the three models did worse (72.33%) than the best individual model. The weaker Focal Loss model dragged down the average.

The fix was weighting each model by its individual accuracy:

```python
def ensemble_predict(models, weights, image):
    predictions = []
    for model, weight in zip(models, weights):
        pred = model.predict(image)
        predictions.append(pred * weight)
    return sum(predictions) / sum(weights)
```

Final ensemble results:

- Surprise: 90.9% to 85.7% (-5.2%)
- Fear: 56.8% to 58.1% (+1.3%)
- Disgust: 43.8% to 67.5% (+23.7%)
- Happiness: 75.2% to 80.5% (+5.3%)
- Sadness: 76.8% to 84.1% (+7.3%)
- Anger: 79.6% to 79.6% (no change)
- Neutral: 74.7% to 74.0% (-0.7%)

The biggest win was Disgust, +23.7%. Different models make different mistakes, which is the whole reason ensembling works here.

## Things that went wrong

### The first epoch was slow

The first epoch took 5-7 minutes on an A100, which seemed wrong for such a small dataset. The cause was CUDA kernel JIT compilation, cuDNN autotuning, and data loader warmup, all of which happen on the first epoch. Subsequent epochs ran in 30-60 seconds. Not a bug, just something I hadn't seen before.

### Fear vs Surprise

The model frequently confused Fear with Surprise. Both involve wide eyes, raised eyebrows, and an open mouth. I looked at the misclassified examples, and honestly, even humans struggle to tell extreme surprise from fear without context. The facial muscle movements are remarkably similar.

Focal Loss helped by forcing the model to pay more attention to the subtle differences, but this remains the hardest boundary and I don't think it's fully solvable from face crops alone. You'd probably need context from the rest of the image.

### Accuracy drops in group photos

The same person got different predictions in an individual photo (large face, predicted Neutral at 89% confidence) and a group photo (small face, predicted Happiness at 45% confidence). Smaller faces lose detail when resized to the 100x100 input, and the expression features blur away.

I lowered MTCNN thresholds to catch smaller faces, increased the margin padding around detected faces, and added Test-Time Augmentation for more stable predictions. It helped, but group photos remain harder.

### Overwriting the model

The second training run overwrote the first model, because both saved to `best_model.pth`. I changed the naming convention to include the configuration:
```
best_efficientnet_b2_focal_model.pth
best_efficientnet_b2_standard_model.pth
best_resnet_standard_model.pth
```

Obvious in hindsight. Cost me a 26-minute training run to learn.

## The web app

### Flask backend

The Flask application handles image upload, face detection, and emotion prediction:

```python
@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    image = Image.open(file.stream).convert('RGB')

    # Detect faces
    faces = detect_faces(image)

    results = []
    for (x, y, w, h) in faces:
        # Extract face with margin
        face_region = extract_face(image, x, y, w, h, margin=0.1)

        # Predict emotion
        emotion, confidence, probabilities = predict_emotion(face_region)

        results.append({
            'bbox': [x, y, w, h],
            'emotion': emotion,
            'confidence': confidence,
            'probabilities': probabilities
        })

    return jsonify({'results': results})
```

### Bounding boxes

Drawing the results took some thought about readability:

```python
EMOTION_COLORS = {
    "Surprise": (0, 255, 255),    # Cyan
    "Fear": (180, 0, 180),        # Purple
    "Disgust": (0, 180, 0),       # Green
    "Happiness": (255, 220, 0),   # Yellow
    "Sadness": (0, 100, 255),     # Blue
    "Anger": (255, 0, 0),         # Red
    "Neutral": (128, 128, 128)    # Gray
}
```

I picked colors that colorblind users can tell apart and that have enough contrast against both light and dark backgrounds.

### Deployment on Hugging Face Spaces

Deployment is a Docker container on Hugging Face Spaces:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements-docker.txt .
RUN pip install --no-cache-dir -r requirements-docker.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

## Testing on unseen images

Happiness detection is consistent, with high confidence. Neutral is reliable at 68%+ confidence. Surprise is good when it isn't being confused with Fear. Multi-face detection handles a range of angles and sizes.

The weak spots: Fear vs Surprise is still the main confusion. Many predictions land in the 40-60% confidence range, which isn't great. Small faces in group photos are still hard. And intense expressions of any kind often get classified as anger.

## Lessons

Class imbalance was the real problem, not the architecture. I spent too long trying different backbones when the data distribution was what needed attention. The "drop" from 82% to 80% accuracy is a better model, because it stopped ignoring the minority classes.

Aggregate metrics hide failures. 82.14% accuracy and 51.4% on Fear describe the same model. For imbalanced problems, look at per-class metrics first.

Focal Loss is tricky. It did what I wanted for minority classes and wrecked majority class performance. The fix wasn't picking one loss over another; it was ensembling models trained with different losses.

Simpler models can win. ResNet-18 (11M parameters) outperformed EfficientNet-B2 (9M parameters) on this task, because it generalized better to the test set.

Cloud GPUs are cheap now. Total training cost for every experiment in this post: about $3.50. Without them the project would have taken weeks instead of days.

Name your model files properly. I lost a 26-minute training run to file overwriting. Now I use `{model}_{dataset}_{loss}_{date}.pth`.

## What I'd do differently

I'd start with class weights and only add Focal Loss if needed. I'd train more diverse architectures from the beginning so the ensemble has more to work with, use stratified cross-validation for evaluation, and put early stopping in from day one.

Beyond that, there are a few directions I haven't tried. Vision Transformers might capture global face structure better than CNNs. Face alignment preprocessing could normalize orientation before classification. Attention mechanisms could let the model weight the mouth or eyes depending on the emotion. Confidence calibration would give more reliable probability estimates. And training on combined datasets would reduce the imbalance at the source.

## Project links

- Live demo: [Hugging Face Space](https://huggingface.co/spaces/TayyabManan/face-expression-detection)
- Source code: [GitHub Repository](https://github.com/TayyabManan/Face-Expression-Detection)
- Project details: [Face Expression Detection Project](/projects/face-expression-detection)

## Acknowledgments

This project was completed as part of the Machine Learning for Engineering Design course. Thanks to my collaborators Syed Measum and Mustafa Rahim, the RAF-DB dataset creators, and the facenet-pytorch library maintainers.

Questions about the implementation, or interested in collaborating? [Reach out](/contact).
