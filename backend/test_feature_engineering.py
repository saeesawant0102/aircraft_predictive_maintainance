import pandas as pd

from utils.feature_engineering import (
    create_engineered_features
)

df = pd.read_csv(
    "../data/dashboard_predictions.csv"
)

df = create_engineered_features(df)

print(df.shape)

print(
    df[
        [
            "sensor_2_avg5",
            "sensor_2_avg10",
            "sensor_2_avg20",
            "sensor_2_avg30",
            "sensor_2_diff"
        ]
    ].head()
)