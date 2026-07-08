import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import API from "../../services/api";

import "./ReportsHistory.css";

function PredictionHistory() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    API.get("/fleet")
      .then((res) => setHistory(res.data))
      .catch(console.error);

  }, []);

  return (

    <div className="history-card">

      <div className="history-header">

        <h2>

          Prediction History

        </h2>

        <p>

          Recent prediction results available in the system.

        </p>

      </div>

      <table className="history-table">

        <thead>

          <tr>

            <th>Engine</th>

            <th>Health</th>

            <th>Predicted RUL</th>

            <th>Recommendation</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {history.map((engine)=>(

            <tr key={engine.engine_id}>

              <td>

                ENG-{engine.engine_id}

              </td>

              <td>

                <span
                  className={
                    engine.Health_Status === "Healthy"
                      ? "status-green"
                      : engine.Health_Status === "Warning"
                      ? "status-yellow"
                      : "status-red"
                  }
                >

                  {engine.Health_Status}

                </span>

              </td>

              <td>

                {Math.round(engine.Predicted_RUL)}

              </td>

              <td>

                {engine.Recommendation}

              </td>

              <td>

                <button className="delete-btn">

                  <Trash2 size={17}/>

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default PredictionHistory;