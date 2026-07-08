import "./SensorAnalysis.css";

function SensorSummaryCards({ latest }) {
  const getStatusColor = () => {
    switch (latest.Health_Status) {
      case "Healthy":
        return "#38D27A";

      case "Warning":
        return "#FFBE0B";

      default:
        return "#FF4D4F";
    }
  };

  const cards = [
    {
      title: "Current Cycle",
      value: latest.cycle,
      color: "#20E3E3",
    },
    {
      title: "Predicted RUL",
      value: Math.round(latest.Predicted_RUL),
      color: "#00F5D4",
    },
    {
      title: "Health Score",
      value: `${latest.Health_Score}%`,
      color: "#38D27A",
    },
    {
      title: "Health Status",
      value: latest.Health_Status,
      color: getStatusColor(),
    },
  ];

  return (
    <div className="sensor-summary-grid">
      {cards.map((card) => (
        <div
          key={card.title}
          className="sensor-summary-card"
        >
          <div className="sensor-card-title">
            {card.title}
          </div>

          <div
            className="sensor-card-value"
            style={{
              color: card.color,
            }}
          >
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SensorSummaryCards;