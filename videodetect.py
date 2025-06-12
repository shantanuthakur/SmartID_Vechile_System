from ultralytics import YOLO
import cv2
import os
from pyzbar.pyzbar import decode

# Load YOLOv8 trained model
model = YOLO(r"D:\Qr_detections\runs\detect\qr_yolov8_model\weights\best.pt")

# Input and output directories
input_dir = r"D:\Qr_detections\Iput_video"
output_dir = "results"
os.makedirs(output_dir, exist_ok=True)

# Process all video files in input folder
for filename in os.listdir(input_dir):
    if filename.endswith((".mp4", ".avi", ".mov", ".mkv")):
        video_path = os.path.join(input_dir, filename)
        cap = cv2.VideoCapture(video_path)

        # Video properties
        width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps    = cap.get(cv2.CAP_PROP_FPS)
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')

        # Output file path
        output_path = os.path.join(output_dir, f"detected_{filename}")
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

        print(f"\n🔍 Processing: {filename}")

        frame_num = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Run YOLOv8 detection
            results = model.predict(source=frame, imgsz=640, conf=0.3, verbose=False)
            annotated_frame = results[0].plot()

            # Decode QR codes using pyzbar
            decoded_objs = decode(frame)
            for obj in decoded_objs:
                qr_data = obj.data.decode("utf-8")
                points = obj.polygon
                if len(points) >= 4:
                    pts = [(p.x, p.y) for p in points]
                    x1, y1 = pts[0]
                    # Draw red decoded text
                    cv2.putText(annotated_frame, qr_data, (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

            # Show frame (optional)
            cv2.imshow("QR Detection", annotated_frame)
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

            out.write(annotated_frame)
            frame_num += 1

        cap.release()
        out.release()
        print(f"✅ Saved: {output_path}")

cv2.destroyAllWindows()
print("\n🎉 All videos processed and saved.")
