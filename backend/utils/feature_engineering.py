import pandas as pd


IMPORTANT_SENSORS = [
    "sensor_2",
    "sensor_4",
    "sensor_11",
    "sensor_15",
    "sensor_17"
]


def create_engineered_features(df):

    df = df.copy()

    for sensor in IMPORTANT_SENSORS:

        df[f"{sensor}_avg5"] = (
            df.groupby("engine_id")[sensor]
            .transform(
                lambda x: x.rolling(
                    window=5,
                    min_periods=1
                ).mean()
            )
        )

        df[f"{sensor}_avg10"] = (
            df.groupby("engine_id")[sensor]
            .transform(
                lambda x: x.rolling(
                    window=10,
                    min_periods=1
                ).mean()
            )
        )

        df[f"{sensor}_avg20"] = (
            df.groupby("engine_id")[sensor]
            .transform(
                lambda x: x.rolling(
                    window=20,
                    min_periods=1
                ).mean()
            )
        )

        df[f"{sensor}_avg30"] = (
            df.groupby("engine_id")[sensor]
            .transform(
                lambda x: x.rolling(
                    window=30,
                    min_periods=1
                ).mean()
            )
        )

        df[f"{sensor}_diff"] = (
            df.groupby("engine_id")[sensor]
            .diff()
            .fillna(0)
        )

    return df