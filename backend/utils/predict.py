from utils.feature_engineering import (
    create_engineered_features
)

from utils.model_loader import (
    HEALTH_MODEL,
    HEALTH_FEATURES,
    RUL_MODEL,
    RUL_FEATURES
)


def get_recommendation(status):

    if status == "Critical":
        return "Immediate Maintenance Required"

    elif status == "Warning":
        return "Schedule Maintenance Soon"

    else:
        return "Operating Normally"


def run_predictions(df):

    # Create engineered features
    df = create_engineered_features(df)

    # Health prediction
    health_preds = HEALTH_MODEL.predict(
        df[HEALTH_FEATURES]
    )

    # RUL prediction
    rul_preds = RUL_MODEL.predict(
        df[RUL_FEATURES]
    )

    # Add predictions
    df["Health_Status"] = health_preds
    df["Predicted_RUL"] = rul_preds

    # Health Score
    max_rul = df["Predicted_RUL"].max()

    df["Health_Score"] = (
        df["Predicted_RUL"] / max_rul
    ) * 100

    df["Health_Score"] = (
        df["Health_Score"]
        .round()
        .astype(int)
    )

    # Maintenance recommendation
    df["Recommendation"] = (
        df["Health_Status"]
        .apply(get_recommendation)
    )

    return df