from ultralytics import YOLO

def main():
    model = YOLO("yolov8s.pt")  # or your custom model
    results = model.train(
        data="data.yaml",  # Your dataset config
        epochs=100,
        imgsz=640,
        batch=16,
        name="qr_yolov8_model",
        device=0  # use CUDA
    )

if __name__ == "__main__":
    from multiprocessing import freeze_support
    freeze_support()
    main()
