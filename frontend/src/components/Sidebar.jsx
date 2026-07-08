import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Fleet Overview",
    path: "/fleet",
  },
  {
    name: "Engine Details",
    path: "/engine/1",
  },
  {
    name: "Sensor Analysis",
    path: "/sensors",
  },
  {
    name: "RUL Prediction",
    path: "/rul",
  },
  {
    name: "Reports & History",
    path: "/reports",
  },
];

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
          fontSize: "48px",
          fontWeight: "700",
        }}
      >
        AeroGuard
      </h1>

      <p
        style={{
          color: "#7CA4B8",
          marginBottom: "45px",
          fontSize: "18px",
        }}
      >
        Predictive Maintenance
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            style={({ isActive }) => ({
              color: isActive ? "#00F5D4" : "#FFFFFF",
              background: isActive ? "#072636" : "transparent",
              padding: "12px 15px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: isActive ? "600" : "500",
              transition: "0.25s",
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;