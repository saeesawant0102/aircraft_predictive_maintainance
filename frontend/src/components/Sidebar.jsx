import {
  LayoutDashboard,
  Plane,
  Cpu,
  Activity,
  TrendingUp,
  FileText,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Fleet Overview",
    path: "/fleet",
    icon: <Plane size={20} />,
  },
  {
    name: "Engine Details",
    path: "/engine/1",
    icon: <Cpu size={20} />,
  },
  {
    name: "Sensor Analysis",
    path: "/sensors",
    icon: <Activity size={20} />,
  },
  {
    name: "RUL Prediction",
    path: "/rul",
    icon: <TrendingUp size={20} />,
  },
  {
    name: "Reports & History",
    path: "/reports",
    icon: <FileText size={20} />,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-icon">

          <Plane size={28} />

        </div>

        <div>

          <h1>AeroGuard</h1>

          <p>PREDICTIVE MAINTENANCE</p>

        </div>

      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <div className="menu-icon-box">

                <span className="menu-icon">

                    {item.icon}

                </span>

            </div>

            <span>

              {item.name}

            </span>

          </NavLink>

        ))}

      </nav>

      <div className="sidebar-footer">

        <div className="footer-dot" />

        <div>

          <h4>Airline System</h4>

          <p>Connected</p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;