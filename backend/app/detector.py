from ultralytics import YOLO

class GarbageDetector:

    def __init__(self):
        self.model = YOLO("../best.pt")
    
    def detect(self,image_path):
        results = self.model.predict(
            source = image_path,
            conf = 0.4,
            verbose = False
        )

        result = results[0]

        detections  = []

        for box in result.boxes:
            detection = {
                "confidence": float(box.conf),
                "bbox": box.xyxy.tolist()[0]
            }

            detections.append(detection)
        return detections
