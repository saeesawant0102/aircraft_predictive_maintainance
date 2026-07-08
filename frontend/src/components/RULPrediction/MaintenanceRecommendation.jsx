import "./RULPrediction.css";

function MaintenanceRecommendation({ latest }) {

  let priority = "";
  let color = "";
  let recommendation = "";

  if (latest.Predicted_RUL < 50) {

    priority = "HIGH PRIORITY";

    color = "#FF4D4F";

    recommendation =
      "Immediate maintenance is recommended. Engine is approaching the end of its predicted useful life.";

  }

  else if (latest.Predicted_RUL < 120) {

    priority = "MEDIUM PRIORITY";

    color = "#FFBE0B";

    recommendation =
      "Schedule maintenance within the next maintenance window to avoid unexpected failures.";

  }

  else {

    priority = "LOW PRIORITY";

    color = "#38D27A";

    recommendation =
      "Engine is operating normally. Continue regular inspections and monitoring.";

  }

  return (

    <div className="recommendation-card">

      <div className="recommendation-header">

        <h2>

          Maintenance Recommendation

        </h2>

        <span
          className="priority-badge"
          style={{
            background: color,
          }}
        >

          {priority}

        </span>

      </div>

      <p>

        {recommendation}

      </p>

      <div className="maintenance-info">

        <div>

          <span>

            Recommended Maintenance

          </span>

          <strong>

            {Math.round(
              latest.Predicted_RUL
            )} Cycles Remaining

          </strong>

        </div>

        <div>

          <span>

            Health Status

          </span>

          <strong>

            {latest.Health_Status}

          </strong>

        </div>

      </div>

    </div>

  );

}

export default MaintenanceRecommendation;