from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

import pandas as pd
from datetime import datetime

from utils.predict import run_predictions
from dashboard_routes import (
    get_fleet_data,
    get_snapshot_data,
    get_predictions_data
)

from database.mongo import (
    datasets_collection,
    prediction_runs_collection,
    engine_predictions_collection,
)

from bson import ObjectId

app = FastAPI(
    title="Aircraft Engine Predictive Maintenance API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Aircraft Engine Predictive Maintenance API Running"
    }


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    return {
        "filename": file.filename,
        "rows": len(df),
        "columns": len(df.columns)
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    predictions = run_predictions(df)

    # Save prediction CSV
    predictions.to_csv(
        "../data/dashboard_predictions.csv",
        index=False
    )

    # Create fleet snapshot
    fleet_snapshot = (
        predictions
        .groupby("engine_id")
        .tail(1)
    )

    fleet_snapshot.to_csv(
        "../data/fleet_dashboard.csv",
        index=False
    )

    # Save dataset information in MongoDB
    dataset_result = datasets_collection.insert_one({
    "filename": file.filename,
    "uploaded_at": datetime.now(),
    "rows": len(df),
    "columns": len(df.columns),
    "engines": int(df["engine_id"].nunique()),
    "status": "Processed"
    })

    dataset_id = dataset_result.inserted_id

    run_result = prediction_runs_collection.insert_one({

    "dataset_id": dataset_id,

    "prediction_time": datetime.now(),

    "total_engines": int(len(fleet_snapshot)),

    "healthy": int(
        (fleet_snapshot["Health_Status"] == "Healthy").sum()
    ),

    "warning": int(
        (fleet_snapshot["Health_Status"] == "Warning").sum()
    ),

    "critical": int(
        (fleet_snapshot["Health_Status"] == "Critical").sum()
    ),

    "avg_rul": float(
        fleet_snapshot["Predicted_RUL"].mean()
    )

    })

    run_id = run_result.inserted_id

    engine_documents = []

    for _, row in fleet_snapshot.iterrows():

        engine_documents.append({

            "run_id": run_id,

            "dataset_id": dataset_id,

            "engine_id": int(row["engine_id"]),

            "health_status": row["Health_Status"],

            "health_score": int(row["Health_Score"]),

            "predicted_rul": float(row["Predicted_RUL"]),

            "prediction_time": datetime.now()

        })

    engine_predictions_collection.insert_many(engine_documents)

    return {
        "message": "Predictions generated successfully",
        "records": len(predictions)
    }


@app.get("/summary")
def get_summary():

    fleet_df = get_fleet_data()

    total_engines = len(fleet_df)

    healthy = (
        fleet_df["Health_Status"] == "Healthy"
    ).sum()

    warning = (
        fleet_df["Health_Status"] == "Warning"
    ).sum()

    critical = (
        fleet_df["Health_Status"] == "Critical"
    ).sum()

    avg_rul = int(
        fleet_df["Predicted_RUL"].mean()
    )

    return {
        "total_engines": total_engines,
        "healthy": int(healthy),
        "warning": int(warning),
        "critical": int(critical),
        "avg_rul": avg_rul
    }


@app.get("/fleet")
def get_fleet():

    fleet_df = get_fleet_data()

    return fleet_df.to_dict(
        orient="records"
    )


@app.get("/fleet/download")
def download_fleet():

    return FileResponse(
        "../data/fleet_dashboard.csv",
        filename="fleet_dashboard.csv",
        media_type="text/csv",
    )


@app.get("/critical")
def get_critical_engines():

    fleet_df = get_fleet_data()

    critical_df = fleet_df[
        fleet_df["Health_Status"] == "Critical"
    ]

    return critical_df.to_dict(
        orient="records"
    )


@app.get("/engine/{engine_id}")
def get_engine(engine_id: int):

    fleet_df = get_fleet_data()

    engine = fleet_df[
        fleet_df["engine_id"] == engine_id
    ]

    if engine.empty:
        return {
            "error": "Engine not found"
        }

    engine_data = engine.iloc[0].to_dict()

    status = engine_data["Health_Status"]

    if status == "Critical":
        engine_data["Recommendation"] = "Immediate Maintenance Required"

    elif status == "Warning":
        engine_data["Recommendation"] = "Schedule Maintenance Soon"

    else:
        engine_data["Recommendation"] = "Operating Normally"

    return engine_data


@app.get("/engine/{engine_id}/history")
def get_engine_history(engine_id: int):

    history = get_predictions_data()

    history = history[
        history["engine_id"] == engine_id
    ]

    return history.to_dict(
        orient="records"
    )

@app.get("/prediction-history")
def prediction_history():

    runs = list(
        prediction_runs_collection
        .find()
        .sort("prediction_time", -1)
    )

    history = []

    for run in runs:

        dataset = datasets_collection.find_one({
            "_id": run["dataset_id"]
        })

        history.append({

            "run_id": str(run["_id"]),

            "dataset_name": dataset["filename"],

            "prediction_time": run["prediction_time"],

            "total_engines": run["total_engines"],

            "healthy": run["healthy"],

            "warning": run["warning"],

            "critical": run["critical"]

        })

    return history