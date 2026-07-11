from app.detector import GarbageDetector
from  app.quantity import QuantityEstimator
import cv2
from backend.app.desision import DecisionEngine

detector = GarbageDetector()

image_path = 'trash1.jpeg'
image_path1 = 'trash2.jpeg'

image = cv2.imread(image_path)
image2 = cv2.imread(image_path1)


height,width = image2.shape[:2]

detections = detector.detect('trash2.jpeg')
estimator = QuantityEstimator()
report = estimator.estimate(
    detections,
    width,
    height
)

waste_type = "Mixed"
engine = DecisionEngine()

final_report = engine.generate_report(
    waste_type=waste_type,
    garbage_count=report["garbage_count"],
    coverage=report["coverage"]
)
print(final_report)

