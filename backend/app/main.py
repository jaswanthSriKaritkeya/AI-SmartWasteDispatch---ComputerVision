from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel, EmailStr, Field
from app.database import users_collection
from fastapi import HTTPException
from app.auth import hash_password, verify_password, create_access_token
from app.detector import GarbageDetector
from app.quantity import QuantityEstimator
from app.desision import DecisionEngine
from app.dispatch import DispatchEngine
from app.report_manager import ReportManager
from fastapi.middleware.cors import CORSMiddleware
from app.dependencies import require_captain
from app.database import vehicles_collection
from app.dispatch_manager import DispatchManager
from bson import ObjectId
from app.database import vehicles_collection
from datetime import datetime
from app.database import (
    users_collection,
    db,
    dispatch_requests_collection
)
from fastapi import Depends
from app.dependencies import (
    get_current_user,
    require_citizen,
    require_captain
)
from app.database import db
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
dispatch_manager = DispatchManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Main is running")

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get('/')
def home():

    return {
        "message" : "This thsi running Be Happy"
    }

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    role: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class VehicleRequest(BaseModel):
    vehicle_number: str
    vehicle_type: str
    capacity: float
    waste_types: list[str]
 
class LocationRequest(BaseModel):
    latitude: float
    longitude: float

@app.post("/auth/register")
def register_user(user: RegisterRequest):

    # Check if email already exists
    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        return {
            "success": False,
            "message": "Email already registered"
        }

    # Validate role
    if user.role not in ["citizen", "captain"]:
        return {
            "success": False,
            "message": "Role must be citizen or captain"
        }

    # Hash password
    hashed_password = hash_password(user.password)

    # Create user
    new_user = {
        "name": user.name,
        "email": user.email,
        "password_hash": hashed_password,
        "role": user.role
    }

    result = users_collection.insert_one(new_user)

    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": str(result.inserted_id),
        "name": user.name,
        "email": user.email,
        "role": user.role
    }

@app.post("/auth/login")
def login_user(user: LoginRequest):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_valid = verify_password(
        user.password,
        existing_user["password_hash"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token({
        "user_id": str(existing_user["_id"]),
        "role": existing_user["role"]
    })

    return {
        "success": True,
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(existing_user["_id"]),
            "name": existing_user["name"],
            "email": existing_user["email"],
            "role": existing_user["role"]
        }
    }

@app.get("/auth/me")
def get_me(current_user=Depends(get_current_user)):

    return {
        "success": True,
        "user": {
            "id": str(current_user["_id"]),
            "name": current_user["name"],
            "email": current_user["email"],
            "role": current_user["role"]
        }
    }

@app.get("/citizen/test")
def citizen_test(
    current_user=Depends(require_citizen)
):
    return {
        "success": True,
        "message": "Citizen access granted",
        "user": {
            "name": current_user["name"],
            "email": current_user["email"],
            "role": current_user["role"]
        }
    }

@app.get("/captain/test")
def captain_test(
    current_user=Depends(require_captain)
):
    return {
        "success": True,
        "message": "Captain access granted",
        "user": {
            "name": current_user["name"],
            "email": current_user["email"],
            "role": current_user["role"]
        }
    }

@app.post("/captain/vehicle")
def register_vehicle(
    vehicle: VehicleRequest,
    current_user=Depends(require_captain)
):

    # Check whether this captain already has a vehicle
    existing_vehicle = vehicles_collection.find_one({
        "captain_id": str(current_user["_id"])
    })

    if existing_vehicle:
        raise HTTPException(
            status_code=400,
            detail="Vehicle already registered for this captain"
        )

    # Check vehicle number uniqueness
    existing_number = vehicles_collection.find_one({
        "vehicle_number": vehicle.vehicle_number
    })

    if existing_number:
        raise HTTPException(
            status_code=400,
            detail="Vehicle number already registered"
        )

    new_vehicle = {
        "captain_id": str(current_user["_id"]),
        "captain_name": current_user["name"],
        "vehicle_number": vehicle.vehicle_number,
        "vehicle_type": vehicle.vehicle_type,
        "capacity": vehicle.capacity,
        "waste_types": vehicle.waste_types,
        "status": "available"
    }

    result = vehicles_collection.insert_one(new_vehicle)

    return {
        "success": True,
        "message": "Vehicle registered successfully",
        "vehicle": {
            "id": str(result.inserted_id),
            "vehicle_number": vehicle.vehicle_number,
            "vehicle_type": vehicle.vehicle_type,
            "capacity": vehicle.capacity,
            "waste_types": vehicle.waste_types,
            "status": "available"
        }
    }


@app.get("/captain/vehicle")
def get_captain_vehicle(
    current_user=Depends(require_captain)
):

    vehicle = vehicles_collection.find_one({
        "captain_id": str(current_user["_id"])
    })

    if not vehicle:
        return {
            "success": True,
            "registered": False,
            "vehicle": None
        }

    return {
        "success": True,
        "registered": True,
        "vehicle": {
            "id": str(vehicle["_id"]),
            "vehicle_number": vehicle["vehicle_number"],
            "vehicle_type": vehicle["vehicle_type"],
            "capacity": vehicle["capacity"],
            "waste_types": vehicle["waste_types"],
            "status": vehicle["status"]
        }
    }

@app.put("/captain/vehicle")
def update_captain_vehicle(
    vehicle: VehicleRequest,
    current_user=Depends(require_captain)
):

    existing_vehicle = vehicles_collection.find_one({
        "captain_id": str(current_user["_id"])
    })

    if not existing_vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not registered"
        )

    # Check if another vehicle uses this number
    existing_number = vehicles_collection.find_one({
        "vehicle_number": vehicle.vehicle_number,
        "_id": {"$ne": existing_vehicle["_id"]}
    })

    if existing_number:
        raise HTTPException(
            status_code=400,
            detail="Vehicle number already registered"
        )

    vehicles_collection.update_one(
        {
            "_id": existing_vehicle["_id"]
        },
        {
            "$set": {
                "vehicle_number": vehicle.vehicle_number,
                "vehicle_type": vehicle.vehicle_type,
                "capacity": vehicle.capacity,
                "waste_types": vehicle.waste_types
            }
        }
    )

    return {
        "success": True,
        "message": "Vehicle details updated successfully"
    }

@app.put("/captain/location")
def update_captain_location(
    location: LocationRequest,
    current_user=Depends(require_captain)
):

    captain_id = str(current_user["_id"])

    result = vehicles_collection.update_one(
        {
            "captain_id": captain_id
        },
        {
            "$set": {
                "location": {
                    "latitude": location.latitude,
                    "longitude": location.longitude
                }
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not registered"
        )

    return {
        "success": True,
        "message": "Captain location updated",
        "location": {
            "latitude": location.latitude,
            "longitude": location.longitude
        }
    }

# GET /captain/requests is defined below with report-enriched data.


@app.post("/captain/requests/{request_id}/accept")
def accept_dispatch_request(
    request_id: str,
    current_user=Depends(require_captain)
):

    captain_id = str(current_user["_id"])

    try:
        request_object_id = ObjectId(request_id)
    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid request ID"
        )


    result = dispatch_manager.accept_request(
        request_object_id,
        captain_id
    )


    if not result["success"]:

        raise HTTPException(
            status_code=409,
            detail=result["message"]
        )


    return result

@app.post("/captain/requests/{request_id}/reject")
def reject_dispatch_request(
    request_id: str,
    current_user=Depends(require_captain)
):

    captain_id = str(current_user["_id"])

    try:
        request_object_id = ObjectId(request_id)
    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid request ID"
        )


    result = dispatch_requests_collection.update_one(

        {
            "_id": request_object_id,
            "captain_id": captain_id,
            "status": "pending"
        },

        {
            "$set": {
                "status": "rejected",
                "rejected_at": datetime.utcnow()
            }
        }
    )


    if result.modified_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Request not found or already processed"
        )


    return {
        "success": True,
        "message": "Dispatch request rejected"
    }


# @Route POST /predict
# @Input accepts Image and waste_type 
# @Returns 
@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    waste_type: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    current_user=Depends(require_citizen)
):

    image_path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    with open(image_path, "wb") as buffer:
        buffer.write(await image.read())

    image_cv = cv2.imread(image_path)

    if image_cv is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid image"
        )

    height, width = image_cv.shape[:2]

    # AI detection
    detections = detector.detect(image_path)

    # Quantity estimation
    analysis = estimator.estimate(
        detections,
        width,
        height
    )

    # No garbage detected
    if analysis["coverage"] == 0:
        return {
            "success": False,
            "message": "Garbage not detected",
            **analysis
        }

    # Decision engine
    final_report = decision_engine.generate_report(
        waste_type=waste_type,
        garbage_count=analysis["garbage_count"],
        coverage=analysis["coverage"]
    )

    # Create pending report
    report = report_manager.create_report({

        # Citizen
        "citizen_id": str(current_user["_id"]),
        "citizen_name": current_user["name"],

        # Waste
        "waste_type": waste_type,
        "garbage_count": analysis["garbage_count"],
        "coverage": analysis["coverage"],

        # Decision
        "severity": final_report["severity"],
        "recommended_vehicle": final_report["recommended_vehicle"],
        "personnel_required": final_report["personnel_required"],
        "recyclable": final_report["recyclable"],

        # Location
        "location": {
            "latitude": latitude,
            "longitude": longitude
        },

        # Image
        "image_filename": image.filename
    })

    eligible_captains = dispatch_engine.find_eligible_captains(
        report
    )

    dispatch_requests = dispatch_manager.create_requests(
        report["report_id"],
        eligible_captains
    )
    return {
        "success": True,
        "message": "Waste report created successfully",
        "report": report
    }

@app.get("/citizen/reports")
def get_my_reports(
    current_user=Depends(require_citizen)
):

    return {
        "success": True,
        "reports": report_manager.get_reports_by_citizen(
            str(current_user["_id"])
        )
    }


# GET /citizen/reports/{report_id}
# Returns a single report by its short report_id string.
# The frontend calls this on the ReportDetails page.
@app.get("/citizen/reports/{report_id}")
def get_my_report(
    report_id: str,
    current_user=Depends(require_citizen)
):

    report = report_manager.get_report(report_id)

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    # Ensure the report belongs to the requesting citizen
    if report.get("citizen_id") != str(current_user["_id"]):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return {
        "success": True,
        "report": report
    }


# GET /captain/requests
# Returns pending dispatch requests for this captain,
# enriched with report details so the UI can display
# waste_type, severity, recommended_vehicle, and location.
@app.get("/captain/requests")
def get_my_requests(
    current_user=Depends(require_captain)
):

    captain_id = str(current_user["_id"])

    requests = dispatch_manager.get_captain_requests(
        captain_id
    )

    # Join report data so the frontend can display waste details
    enriched = []
    for req in requests:
        report = report_manager.get_report(req.get("report_id"))
        if report:
            req["waste_type"] = report.get("waste_type")
            req["severity"] = report.get("severity")
            req["recommended_vehicle"] = report.get("recommended_vehicle")
            req["location"] = report.get("location")
            req["coverage"] = report.get("coverage")
            req["garbage_count"] = report.get("garbage_count")
        enriched.append(req)

    return {
        "success": True,
        "requests": enriched
    }


# GET /captain/tasks/active
# Returns the active task (assigned or in_progress) for this captain.
# The frontend polls this to display the captain's current assignment.
@app.get("/captain/tasks/active")
def get_active_task(
    current_user=Depends(require_captain)
):

    captain_id = str(current_user["_id"])

    report = db["reports"].find_one({
        "captain_id": captain_id,
        "status": {"$in": ["assigned", "in_progress"]}
    })

    if not report:
        return {
            "success": True,
            "task": None
        }

    report["_id"] = str(report["_id"])

    return {
        "success": True,
        "task": report
    }


# POST /captain/tasks/{report_id}/start
# Captain marks a task as in_progress (collection has begun).
@app.post("/captain/tasks/{report_id}/start")
def start_task(
    report_id: str,
    current_user=Depends(require_captain)
):

    captain_id = str(current_user["_id"])

    result = db["reports"].update_one(
        {
            "report_id": report_id,
            "captain_id": captain_id,
            "status": "assigned"
        },
        {
            "$set": {
                "status": "in_progress",
                "started_at": datetime.utcnow()
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Task not found or cannot be started"
        )

    report = report_manager.get_report(report_id)

    return {
        "success": True,
        "message": "Collection started",
        "report": report
    }


# POST /captain/tasks/{report_id}/complete
# Captain marks a task as completed.
# Also frees the captain's vehicle back to available.
@app.post("/captain/tasks/{report_id}/complete")
def complete_task(
    report_id: str,
    current_user=Depends(require_captain)
):

    captain_id = str(current_user["_id"])

    result = db["reports"].update_one(
        {
            "report_id": report_id,
            "captain_id": captain_id,
            "status": "in_progress"
        },
        {
            "$set": {
                "status": "completed",
                "completed_at": datetime.utcnow()
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Task not found or cannot be completed"
        )

    # Free the captain's vehicle back to available
    vehicles_collection.update_one(
        {"captain_id": captain_id},
        {"$set": {"status": "available"}}
    )

    report = report_manager.get_report(report_id)

    return {
        "success": True,
        "message": "Collection completed",
        "report": report
    }