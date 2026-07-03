function Header() {
  return (
    <div
      style={{
        height: "90px",
        borderBottom: "1px solid #08384A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >
      <div>
        <h2>Dashboard</h2>
        <p style={{ color: "#7CA4B8" }}>
          Real-time fleet health overview
        </p>
      </div>

      <input
        placeholder="Search engines..."
        style={{
          background: "#031722",
          border: "1px solid #0B556B",
          padding: "12px 20px",
          borderRadius: "10px",
          color: "white",
          width: "300px",
        }}
      />
    </div>
  );
}

export default Header;