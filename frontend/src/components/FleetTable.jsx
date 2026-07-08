import React, { useEffect, useState } from "react";
import API from "../services/api";

function FleetTable() {
  const [fleetData, setFleetData] = useState([]);

  useEffect(() => {
    API.get("/fleet")
      .then((res) => {
        setFleetData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const topRisk = [...fleetData]
    .sort((a, b) => a.Predicted_RUL - b.Predicted_RUL)
    .slice(0, 8);

  if (!fleetData.length) {
    return (
      <div className="fleet-table-card">
        <h3>Top Risk Engines</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="fleet-table-card">
      <h3>Fleet Snapshot — Top Risk Engines</h3>

      <table className="fleet-table">
        <thead>
          <tr>
            <th>Engine</th>
            <th>Status</th>
            <th>Health</th>
            <th>Predicted RUL</th>
          </tr>
        </thead>

        <tbody>
          {topRisk.map((engine) => (
            <tr key={engine.engine_id}>
              <td>ENG-{engine.engine_id}</td>

              <td
                style={{
                  color:
                    engine.Health_Status === "Critical"
                      ? "#FF4D4F"
                      : engine.Health_Status === "Warning"
                      ? "#FFBE0B"
                      : "#38D27A",
                }}
              >
                {engine.Health_Status}
              </td>

              <td>{engine.Health_Score}</td>

              <td>{Math.round(engine.Predicted_RUL)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FleetTable;