function Sidebar() {
  return (
    <div
      style={{
        width: "280px",
        background: "#031722",
        borderRight: "1px solid #08384A",
        height: "100vh",
        padding: "30px 20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h1
        style={{
          color: "#00F5D4",
          marginBottom: "10px",
        }}
      >
        AeroGuard
      </h1>

      <p
        style={{
          color: "#7CA4B8",
          marginBottom: "40px",
        }}
      >
        Predictive Maintenance
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <span>Dashboard</span>
        <span>Fleet Overview</span>
        <span>Engine Details</span>
        <span>Sensor Analysis</span>
        <span>RUL Prediction</span>
        <span>Health Assessment</span>
      </div>
    </div>
  );
}

export default Sidebar;