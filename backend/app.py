from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from utils.predict import run_predictions
from dashboard_routes import (
    get_fleet_data,
    get_snapshot_data,
    get_predictions_data
)
from fastapi.responses import FileResponse

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
async def upload_csv(
    file: UploadFile = File(...)
):

    df = pd.read_csv(file.file)

    return {
        "filename": file.filename,
        "rows": len(df),
        "columns": len(df.columns)
    }

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    df = pd.read_csv(file.file)

    predictions = run_predictions(df)

    predictions.to_csv(
        "../data/dashboard_predictions.csv",
        index=False
    )

    fleet_snapshot = (
        predictions
        .groupby("engine_id")
        .tail(1)
    )

    fleet_snapshot.to_csv(
        "../data/fleet_dashboard.csv",
        index=False
    )

    return {
        "message": "Predictions generated successfully",
        "records": len(predictions)
    }

@app.get("/summary")
def get_summary():

    fleet_df = get_fleet_data()

    total_engines = len(fleet_df)

    healthy = (
        fleet_df["Health_Status"]
        .eq("Healthy")
        .sum()
    )

    warning = (
        fleet_df["Health_Status"]
        .eq("Warning")
        .sum()
    )

    critical = (
        fleet_df["Health_Status"]
        .eq("Critical")
        .sum()
    )

    avg_rul = int(
        fleet_df["Predicted_RUL"]
        .mean()
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

    if len(engine) == 0:

        return {
            "error": "Engine not found"
        }

    engine_data = engine.iloc[0].to_dict()

    status = engine_data["Health_Status"]

    if status == "Critical":
        engine_data["Recommendation"] = (
            "Immediate Maintenance Required"
        )

    elif status == "Warning":
        engine_data["Recommendation"] = (
            "Schedule Maintenance Soon"
        )

    else:
        engine_data["Recommendation"] = (
            "Operating Normally"
        )

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