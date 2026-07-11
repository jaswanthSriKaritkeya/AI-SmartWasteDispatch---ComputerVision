# ♻️ AI Smart Garbage Dispatch System

> **An AI-powered intelligent waste management platform that automates garbage detection, prioritization, and vehicle dispatch using Computer Vision.**

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![YOLO](https://img.shields.io/badge/YOLO-Object%20Detection-red?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

# 📖 Overview

The **AI Smart Garbage Dispatch System** is an intelligent waste management platform designed to help municipalities automate garbage collection.

Citizens can upload an image of uncollected garbage through an intuitive web interface. The uploaded image is analyzed using a trained **YOLO Computer Vision model**, which detects garbage, estimates its coverage, and determines the severity level.

Based on the AI analysis, the system automatically assigns the most suitable garbage collection vehicle and generates a dispatch report for municipal authorities.

The project aims to reduce manual inspection, improve collection efficiency, and enable faster response to waste accumulation in urban environments.

---

# 🚀 Features

### 🤖 AI Garbage Detection

- Garbage detection using YOLO
- Bounding Box Detection
- Confidence Score Generation
- Multiple Object Detection

### 📊 Intelligent Dispatch Engine

- Garbage Coverage Calculation
- Severity Classification
- Vehicle Assignment
- Report Generation

### 🚛 Fleet Dashboard

- View all garbage reports
- Assigned vehicle details
- Dispatch status
- Search reports
- Live fleet overview

### 👤 Citizen Dashboard

- Upload garbage images
- Select waste category
- AI prediction results
- Dispatch timeline
- Vehicle assignment status

### 🎨 Modern UI

- Glassmorphism Design
- TailwindCSS
- Framer Motion Animations
- Responsive Layout
- Interactive Dashboard

---

# 🏗 System Architecture

```text
                    AI SMART GARBAGE DISPATCH SYSTEM

Citizen
   │
   ▼
React Frontend
   │
   │ Upload Image
   ▼
FastAPI Backend
   │
   ▼
YOLO Object Detection Model
   │
   ▼
Coverage Calculation
   │
   ▼
Severity Analysis
   │
   ▼
Vehicle Dispatch Engine
   │
   ▼
Report Generation
   │
   ▼
Fleet Dashboard
```

---

# ⚙️ Technical Workflow

## Step 1

Citizen uploads an image of garbage.

↓

## Step 2

The React frontend sends the image and waste type to the FastAPI backend.

↓

## Step 3

The backend loads the trained YOLO model.

↓

## Step 4

YOLO detects garbage objects and returns:

- Bounding Boxes
- Confidence Scores

↓

## Step 5

The backend calculates garbage coverage.

↓

## Step 6

Severity is determined using predefined thresholds.

↓

## Step 7

The Dispatch Engine assigns the most suitable vehicle.

↓

## Step 8

A dispatch report is generated and displayed on the Fleet Dashboard.

---

# 🧠 AI Pipeline

```text
Image Upload
      │
      ▼
YOLO Model
      │
      ▼
Garbage Detection
      │
      ▼
Bounding Boxes
      │
      ▼
Coverage %
      │
      ▼
Severity
      │
      ▼
Vehicle Assignment
      │
      ▼
Dispatch Report
```

---

# 💻 Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Icons
- Vite

---

## Backend

- FastAPI
- Python
- Uvicorn

---

## Artificial Intelligence

- YOLO (Ultralytics)
- PyTorch
- OpenCV
- NumPy

---

## Development Tools

- VS Code
- Git
- GitHub

---

# 📂 Project Structure

```text
AI-Smart-Garbage-Dispatch-System
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── services
│   │   └── assets
│   │
│   ├── public
│   └── package.json
│
├── backend
│   ├── main.py
│   ├── dispatch.py
│   ├── report_manager.py
│   ├── detector.py
│   ├── decision.py
│   ├── vehicles.json
│   ├── models
│   │   └── best.pt
│   └── requirements.txt
│
└── README.md
```

---

# 📡 API Endpoints

## Predict Garbage

```http
POST /predict
```

Request

```
multipart/form-data

image
waste_type
```

Response

```json
{
    "report_id":"AB12CD34",
    "waste_type":"Mixed",
    "severity":"High",
    "coverage":28.4,
    "assigned_vehicle":{
        "vehicle_no":"TS09GV105",
        "driver":"Arjun",
        "status":"Available"
    }
}
```

---

## Fleet Reports

```http
GET /reports
```

Returns all generated dispatch reports.

---

# 🚛 Dispatch Logic

The dispatch engine works using three major parameters:

✅ Waste Type Compatibility

↓

✅ Vehicle Availability

↓

✅ Vehicle Assignment

If no suitable vehicle is available, the report remains in **Pending** status.

---

# 🎯 Current Capabilities

- AI-based garbage detection
- Automatic report generation
- Vehicle assignment
- Fleet dashboard
- Citizen dashboard
- Confidence score calculation
- Coverage estimation
- Severity classification
- Modern responsive UI

---

# 🔮 Future Enhancements

- MongoDB Integration
- Live GPS Location
- Interactive Garbage Map
- Real-time Vehicle Tracking
- WebSocket Communication
- Driver Mobile Application
- Route Optimization
- Notification System
- Analytics Dashboard
- AI-based Garbage Quantity Estimation

---

# 📸 Screenshots

> Add screenshots here before submitting your project.

Example:

```
Home Page

Citizen Dashboard

Fleet Dashboard

AI Detection Result

Dispatch Report
```

---

# 🛠 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Smart-Garbage-Dispatch-System.git
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🌍 Vision

Our vision is to build a **Smart City Waste Management Platform** that leverages Artificial Intelligence to automate garbage detection, optimize municipal operations, and contribute to cleaner, healthier, and more sustainable cities.

---

# 👨‍💻 Developed For

Hackathons • Smart City Solutions • Municipal Waste Management • Computer Vision Applications

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jaswanth Sri Karthikeya**

Computer Science Engineering Student

Artificial Intelligence | Computer Vision | Full Stack Development

---

> **"Using AI to build cleaner, smarter, and more sustainable cities." ♻️**
