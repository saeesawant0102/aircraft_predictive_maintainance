import "./RULPrediction.css";

function RULSummaryCards({ latest }) {

  const getRisk = () => {

    if (latest.Predicted_RUL < 50)
      return {
        text: "High",
        color: "#FF4D4F",
      };

    if (latest.Predicted_RUL < 120)
      return {
        text: "Medium",
        color: "#FFBE0B",
      };

    return {
      text: "Low",
      color: "#38D27A",
    };

  };

  const risk = getRisk();

  const cards = [

    {
      title: "Current Cycle",
      value: latest.cycle,
      color: "#20E3E3",
    },

    {
      title: "Predicted RUL",
      value: Math.round(
        latest.Predicted_RUL
      ),
      color: "#00F5D4",
    },

    {
      title: "Health Score",
      value: `${latest.Health_Score}%`,
      color: "#38D27A",
    },

    {
      title: "Risk Level",
      value: risk.text,
      color: risk.color,
    },

  ];

  return (

    <div className="rul-summary-grid">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rul-summary-card"
        >

          <div className="rul-card-title">

            {card.title}

          </div>

          <div
            className="rul-card-value"
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

export default RULSummaryCards;