import { useEffect, useState } from "react";
import API from "../services/api";

function KPICards() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    API.get("/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!summary) return <p>Loading...</p>;

  const cards = [
    {
      title: "Total Engines",
      value: summary.total_engines,
      color: "#35D6FF",
    },
    {
      title: "Healthy",
      value: summary.healthy,
      color: "#38D27A",
    },
    {
      title: "Warning",
      value: summary.warning,
      color: "#FFBE0B",
    },
    {
      title: "Critical",
      value: summary.critical,
      color: "#FF4D4F",
    },
    {
      title: "Average RUL",
      value: summary.avg_rul,
      color: "#00F5D4",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: "20px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#051F2B",
            border: "1px solid #0B556B",
            borderRadius: "20px",
            padding: "25px",
            minHeight: "170px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              border: `1px solid ${card.color}`,
              marginBottom: "20px",
            }}
          />

          <h1
            style={{
              color: card.color,
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            {card.value}
          </h1>

          <h3>{card.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default KPICards;