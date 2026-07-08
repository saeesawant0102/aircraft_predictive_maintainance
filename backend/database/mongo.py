
datasets_collection = None
prediction_runs_collection = None
engine_predictions_collection = None

"""
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGO_URI)

db = client[DATABASE_NAME]

datasets_collection = db["datasets"]

prediction_runs_collection = db["prediction_runs"]

engine_predictions_collection = db["engine_predictions"]

print("Connected to MongoDB!")

print(db.list_collection_names())
"""