from fastapi import FastAPI, UploadFile, File
import pandas as pd

app = FastAPI(
    title="Aircraft Engine Predictive Maintenance API"
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