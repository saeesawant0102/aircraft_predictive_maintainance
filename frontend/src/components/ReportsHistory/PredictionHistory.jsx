import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import API from "../../services/api";

import "./ReportsHistory.css";

function PredictionHistory() {

  const [history, setHistory] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRun, setSelectedRun] = useState(null);

  useEffect(() => {

    API.get("/prediction-history")
      .then((res) => {
        setHistory(res.data);
      })
      .catch(console.error);

  }, []);

  const deleteRun = async () => {

    try{

        await API.delete(
            `/prediction-runs/${selectedRun.run_id}`
        );

        setHistory(

            history.filter(

                (run)=>run.run_id!==selectedRun.run_id

            )

        );

        setShowConfirm(false);

        setSelectedRun(null);

    }

    catch(err){

        console.error(err);

        alert("Failed to delete prediction run.");

    }

  };

  return (

    <div className="history-card">

      <div className="history-header">

        <h2>
          Prediction History
        </h2>

        <p>
          All prediction runs stored in MongoDB.
        </p>

      </div>

      <table className="history-table">

        <thead>

          <tr>

            <th>Dataset</th>

            <th>Prediction Time</th>

            <th>Engines</th>

            <th>Healthy</th>

            <th>Warning</th>

            <th>Critical</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {history.map((run) => (

            <tr key={run.run_id}>

              <td>
                {run.dataset_name}
              </td>

              <td>
                {new Date(run.prediction_time).toLocaleString()}
              </td>

              <td>
                {run.total_engines}
              </td>

              <td>
                <span className="status-green">
                  {run.healthy}
                </span>
              </td>

              <td>
                <span className="status-yellow">
                  {run.warning}
                </span>
              </td>

              <td>
                <span className="status-red">
                  {run.critical}
                </span>
              </td>

              <td>

                <span className="status-green">
                  {run.status}
                </span>

              </td>

              <td>

                <button
                    className="delete-btn"
                    onClick={() => {

                        setSelectedRun(run);

                        setShowConfirm(true);

                    }}
                >

                    <Trash2 size={17}/>

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
        
      {showConfirm && (

    <div className="confirm-overlay">

        <div className="confirm-box">

            <h2>

                Delete Prediction Run?

            </h2>

            <p>

                This will permanently delete the prediction run for

                <b> {selectedRun?.dataset_name}</b>

                and all associated engine predictions.

            </p>

            <div className="confirm-buttons">

                <button
                    className="cancel-btn"
                    onClick={() => {

                        setShowConfirm(false);

                        setSelectedRun(null);

                    }}
                >
                    Cancel
                </button>

                <button
                    className="delete-confirm-btn"
                    onClick={deleteRun}
                >
                    Delete
                </button>

            </div>

        </div>

    </div>

)}
    </div>

    

  );

}

export default PredictionHistory;