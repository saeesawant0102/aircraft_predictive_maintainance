import { useEffect, useState } from "react";
import API from "../services/api";

function KPICards() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {

    API.get("/summary")
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <div>
        <h3>Total Engines</h3>
        <p>{summary.total_engines}</p>
      </div>

      <div>
        <h3>Healthy</h3>
        <p>{summary.healthy}</p>
      </div>

      <div>
        <h3>Warning</h3>
        <p>{summary.warning}</p>
      </div>

      <div>
        <h3>Critical</h3>
        <p>{summary.critical}</p>
      </div>

      <div>
        <h3>Average RUL</h3>
        <p>{summary.avg_rul}</p>
      </div>
    </div>
  );
}

export default KPICards;