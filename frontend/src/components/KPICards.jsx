import { useEffect, useState } from "react";
import API from "../services/api";
import "./KPICards.css";

import {
  Cpu,
  ShieldCheck,
  TriangleAlert,
  Siren,
  TimerReset,
} from "lucide-react";

function KPICards() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    API.get("/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!summary) return <p style={{ color: "white" }}>Loading...</p>;

  const cards = [
    {
      title: "Total Engines",
      value: summary.total_engines,
      color: "#35D6FF",
      icon: <Cpu size={28} />,
    },
    {
      title: "Healthy",
      value: summary.healthy,
      color: "#38D27A",
      icon: <ShieldCheck size={28} />,
    },
    {
      title: "Warning",
      value: summary.warning,
      color: "#FFBE0B",
      icon: <TriangleAlert size={28} />,
    },
    {
      title: "Critical",
      value: summary.critical,
      color: "#FF4D4F",
      icon: <Siren size={28} />,
    },
    {
      title: "Average RUL",
      value: summary.avg_rul,
      color: "#00F5D4",
      icon: <TimerReset size={28} />,
    },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card) => (
        <div
          key={card.title}
          className="kpi-card"
        >
          <div
            className="kpi-icon"
            style={{
              borderColor: card.color,
              color: card.color,
            }}
          >
            {card.icon}
          </div>

          <h1
            style={{
              color: card.color,
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