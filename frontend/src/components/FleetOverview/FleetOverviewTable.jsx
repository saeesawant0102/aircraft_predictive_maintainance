import "./FleetOverview.css";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function FleetOverviewTable({ data }) {
  const navigate = useNavigate();

  return (
    <div className="fleet-table-card">
      <div className="table-wrapper">
        <table className="fleet-table">
          <thead>
            <tr>
              <th>Engine ID</th>
              <th>Cycle</th>
              <th>Health Status</th>
              <th>Health Score</th>
              <th>Predicted RUL</th>
              <th>Recommendation</th>
              <th>Engine Details</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#8EAEC0",
                  }}
                >
                  No engines found.
                </td>
              </tr>
            ) : (
              data.map((engine) => (
                <tr key={engine.engine_id}>
                  <td className="engine-id">
                    ENG-{engine.engine_id}
                  </td>

                  <td>
                    {engine.cycle}
                  </td>

                  <td>
                    <StatusBadge
                      status={engine.Health_Status}
                    />
                  </td>

                  <td>
                    <strong>{engine.Health_Score}</strong>
                  </td>

                  <td>
                    {Math.round(engine.Predicted_RUL)}
                  </td>

                  <td className="recommendation">
                    {engine.Recommendation}
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/engine/${engine.engine_id}`
                        );
                      }}
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetOverviewTable;