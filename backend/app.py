from fastapi import FastAPI

app = FastAPI(
    title="Aircraft Engine Predictive Maintenance API"
)

@app.get("/")
def home():
    return {
        "message": "Aircraft Engine Predictive Maintenance API Running"
    }