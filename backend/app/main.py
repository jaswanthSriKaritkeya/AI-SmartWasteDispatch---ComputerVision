from fastapi import FastAPI, UploadFile, File, Form
from app.detector import GarbageDetector
from app.quantity import QuantityEstimator
from app.desision import DecisionEngine
from app.dispatch import DispatchEngine
from app.report_manager import ReportManager
from fastapi.middleware.cors import CORSMiddleware
import cv2
import os

origins = [
    "http://localhost:5173",
]

app = FastAPI()
detector = GarbageDetector()
estimator = QuantityEstimator()
decision_engine = DecisionEngine()
dispatch_engine = DispatchEngine()
report_manager = ReportManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get('/')
def home():

    return {
        "message" : "This thsi running Be Happy"
    }

# @Route POST /predict
# @Input accepts Image and waste_type 
# @Returns 
@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    waste_type: str = Form(...)
):
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)

    with open(image_path, "wb") as buffer:
        buffer.write(await image.read())

    image_cv = cv2.imread(image_path)

    height, width = image_cv.shape[:2] 
    detections = detector.detect(image_path)

    report = estimator.estimate(
        detections,
        width,
        height
    )
    if(report["coverage"] == 0):
        return {
            "Message" : "Garbage does not detected",
            **report
        }
    final_report = decision_engine.generate_report(
        waste_type=waste_type,
        garbage_count=report["garbage_count"],
        coverage=report["coverage"]
    )

    assigned_vehicle = dispatch_engine.assign_vehicle(waste_type)

    report = report_manager.create_report({
        **final_report,
        "assigned_vehicle": assigned_vehicle
    })

    return report

@app.get("/reports")
def get_reports():
    return report_manager.get_all_reports()