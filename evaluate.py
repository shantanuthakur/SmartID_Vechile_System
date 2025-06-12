import os
from ultralytics import YOLO
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import numpy as np

# --- Config ---
model_path = r"D:\Qr_detections\runs\detect\qr_yolov8_model\weights\best.pt"
image_folder = r"D:\Qr_detections\dataset\valid\images"
label_folder = r"D:\Qr_detections\dataset\valid\labels"
results_folder = "results"
os.makedirs(results_folder, exist_ok=True)
result_file = os.path.join(results_folder, "metrics.txt")

# --- Load model ---
model = YOLO(model_path)

# --- Initialize ---
y_true = []
y_pred = []

# --- Process each test image ---
image_paths = [os.path.join(image_folder, f) for f in os.listdir(image_folder) if f.endswith(('.jpg', '.png'))]

for path in image_paths:
    results = model(path)[0]
    pred_classes = [int(box.cls.item()) for box in results.boxes]

    label_file = os.path.join(label_folder, os.path.basename(path).replace('.jpg', '.txt').replace('.png', '.txt'))
    if os.path.exists(label_file):
        with open(label_file, 'r') as f:
            true_classes = [int(line.strip().split()[0]) for line in f.readlines()]
    else:
        true_classes = []

    if true_classes and pred_classes:
        y_true.append(true_classes[0])
        y_pred.append(pred_classes[0])

# --- Calculate Metrics ---
acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred, average='weighted', zero_division=0)
rec = recall_score(y_true, y_pred, average='weighted', zero_division=0)
f1 = f1_score(y_true, y_pred, average='weighted', zero_division=0)
cm = confusion_matrix(y_true, y_pred)

# --- Save Results ---
with open(result_file, "w") as f:
    f.write(f"Accuracy: {acc:.4f}\n")
    f.write(f"Precision: {prec:.4f}\n")
    f.write(f"Recall: {rec:.4f}\n")
    f.write(f"F1 Score: {f1:.4f}\n")
    f.write(f"Confusion Matrix:\n{cm}\n")

print("✅ Evaluation complete. Results saved to:", result_file)
