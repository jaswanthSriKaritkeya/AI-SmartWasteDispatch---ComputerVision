from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    raise Exception("MONGO_URL is not configured in .env")

client = MongoClient(MONGO_URL)

try:
    client.admin.command("ping")
    print("MongoDB connected successfully")
except Exception as e:
    print("MongoDB connection failed:", e)

db = client["SmartWasteDispatch"]

users_collection = db["users"]
vehicles_collection = db["vehicles"]
reports_collection = db["reports"]
dispatch_requests_collection = db["dispatch_requests"]
