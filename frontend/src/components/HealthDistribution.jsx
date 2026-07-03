import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function HealthDistribution() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    API.get("/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!summary) {
    return <div className="chart-card">Loading...</div>;
  }

  const data = [
    {
      name: "Healthy",
      value: summary.healthy,
      color: "#38D27A",
    },
    {
      name: "Warning",
      value: summary.warning,
      color: "#FFBE0B",
    },
    {
      name: "Critical",
      value: summary.critical,
      color: "#FF4D4F",
    },
  ];

  return (
    <div className="chart-card">
      <h3>Health Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {data.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "4px",
                  background: item.color,
                }}
              />

              <span
                style={{
                  color: "#C9D1D9",
                  fontSize: "18px",
                }}
              >
                {item.name}
              </span>
            </div>

            <span
              style={{
                color: item.color,
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthDistribution;