import joblib


HEALTH_MODEL = joblib.load(
    "../models/rf_health_classifier.pkl"
)

CLASS_LABELS = joblib.load(
    "../models/class_labels.pkl"
)

HEALTH_FEATURES = joblib.load(
    "../models/model_features.pkl"
)

RUL_MODEL = joblib.load(
    "../models/rul_model.pkl"
)

RUL_FEATURES = joblib.load(
    "../models/rul_features.pkl"
)

RUL_METRICS = joblib.load(
    "../models/rul_metrics.pkl"
)