import "./FleetOverview.css";

function StatusBadge({ status }) {
  let className = "status-pill ";

  switch (status) {
    case "Healthy":
      className += "status-healthy";
      break;

    case "Warning":
      className += "status-warning";
      break;

    case "Critical":
      className += "status-critical";
      break;

    default:
      className += "status-warning";
  }

  return (
    <span className={className}>
      <span>●</span>
      {status}
    </span>
  );
}

export default StatusBadge;