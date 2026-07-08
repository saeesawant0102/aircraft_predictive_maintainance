import "./RULPrediction.css";

function RemainingLifeGauge({ latest }) {

  const percent = Math.min(
    100,
    (latest.Predicted_RUL / 300) * 100
  );

  return (

    <div className="gauge-card">

      <h2>

        Remaining Useful Life

      </h2>

      <div className="gauge-value">

        {Math.round(percent)}%

      </div>

      <div className="gauge-bar">

        <div
          className="gauge-fill"
          style={{
            width:`${percent}%`,
          }}
        />

      </div>

      <p>

        {Math.round(
          latest.Predicted_RUL
        )} Cycles Remaining

      </p>

    </div>

  );

}

export default RemainingLifeGauge;