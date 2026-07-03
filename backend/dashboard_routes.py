import pandas as pd
from pathlib import Path

DATA_DIR = Path("../data")


def get_fleet_data():
    return pd.read_csv(
        DATA_DIR / "fleet_dashboard.csv"
    )


def get_snapshot_data():
    return pd.read_csv(
        DATA_DIR / "latest_engine_snapshot.csv"
    )


def get_predictions_data():
    return pd.read_csv(
        DATA_DIR / "dashboard_predictions.csv"
    )