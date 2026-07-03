import pandas as pd

from utils.feature_engineering import (
    create_engineered_features
)

from utils.model_loader import (
    HEALTH_MODEL,
    HEALTH_FEATURES,
    CLASS_LABELS,
    RUL_MODEL,
    RUL_FEATURES
)


df = pd.read_csv(
    "../data/dashboard_predictions.csv"
)

df = create_engineered_features(df)

health_preds = HEALTH_MODEL.predict(
    df[HEALTH_FEATURES]
)

rul_preds = RUL_MODEL.predict(
    df[RUL_FEATURES]
)

df["Health_Status_Pred"] = health_preds
df["Predicted_RUL_New"] = rul_preds

print(
    df[
        [
            "engine_id",
            "cycle",
            "Health_Status_Pred",
            "Predicted_RUL_New"
        ]
    ].head()
)