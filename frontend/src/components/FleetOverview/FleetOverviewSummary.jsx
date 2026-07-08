import "./FleetOverview.css";

function FleetOverviewSummary({ data }) {
  const total = data.length;

  const healthy = data.filter(
    (e) => e.Health_Status === "Healthy"
  ).length;

  const warning = data.filter(
    (e) => e.Health_Status === "Warning"
  ).length;

  const critical = data.filter(
    (e) => e.Health_Status === "Critical"
  ).length;

  const cards = [
    {
      title: "Total Engines",
      value: total,
      className: "summary-blue",
    },
    {
      title: "Healthy",
      value: healthy,
      className: "summary-green",
    },
    {
      title: "Warning",
      value: warning,
      className: "summary-yellow",
    },
    {
      title: "Critical",
      value: critical,
      className: "summary-red",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`summary-card ${card.className}`}
        >
          <h4>{card.title}</h4>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default FleetOverviewSummary;