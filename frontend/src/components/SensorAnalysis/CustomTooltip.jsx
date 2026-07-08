import "./SensorAnalysis.css";

function CustomTooltip({
  active,
  payload,
  label,
}) {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="custom-tooltip">

        <h4>{label}</h4>

        <p>

          Value:
          <strong>

            {" "}
            {Number(
              payload[0].value
            ).toFixed(3)}

          </strong>

        </p>

      </div>
    );
  }

  return null;
}

export default CustomTooltip;