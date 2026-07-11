import { useEffect, useState } from "react";
import {
  Database,
  Eye,
  Trash2,
} from "lucide-react";

import API from "../../services/api";

import "./ReportsHistory.css";

function DatasetHistory() {

  const [datasets, setDatasets] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [showView, setShowView] = useState(false);
  const [datasetDetails, setDatasetDetails] = useState(null);

  useEffect(() => {

    API.get("/datasets")
      .then((res) => {
        setDatasets(res.data);
      })
      .catch(console.error);

  }, []);

  const deleteDataset = async () => {

    try {

      await API.delete(`/datasets/${selectedDataset.id}`);

      setDatasets(
        datasets.filter(
          (item) => item.id !== selectedDataset.id
        )
      );

      setShowConfirm(false);

      setSelectedDataset(null);

    } catch (err) {

      console.error(err);

      alert("Failed to delete dataset.");

    }

  };

  const viewDataset = async (id) => {

    try {

      const res = await API.get(`/datasets/${id}`);

      setDatasetDetails(res.data);

      setShowView(true);

    }

    catch(err){

      console.error(err);

      alert("Unable to load dataset.");

    }

  };

  return (

    <>

      <div className="dataset-card">

        <div className="history-header">

          <h2>
            Dataset History
          </h2>

          <p>
            Previously processed datasets available for review.
          </p>

        </div>

        <table className="history-table">

          <thead>

            <tr>

              <th>Dataset</th>

              <th>Upload Date</th>

              <th>Rows</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {datasets.map((file) => (

              <tr key={file.id}>

                <td>

                  <div className="dataset-name">

                    <Database size={18}/>

                    {file.filename}

                  </div>

                </td>

                <td>

                  {new Date(file.uploaded_at).toLocaleString()}

                </td>

                <td>

                  {file.rows.toLocaleString()}

                </td>

                <td>

                  <span className="status-green">

                    {file.status}

                  </span>

                </td>

                <td>

                  <div className="dataset-actions">

                    <button className="view-btn"
                      onClick={() => viewDataset(file.id)}  
                    >

                      <Eye size={17}/>

                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        setSelectedDataset(file);
                        setShowConfirm(true);
                      }}
                    >

                      <Trash2 size={17}/>

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showConfirm && (

        <div className="confirm-overlay">

          <div className="confirm-box">

            <h2>Delete Dataset?</h2>

            <p>

              This will permanently delete

              <b> {selectedDataset?.filename}</b>

              and all associated prediction history.

            </p>

            <div className="confirm-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={deleteDataset}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      {
  showView && datasetDetails && (

  <div className="confirm-overlay">

      <div className="confirm-box">

          <h2>

              Dataset Details

          </h2>

          <p>

              <b>Filename:</b> {datasetDetails.filename}

              <br/><br/>

              <b>Uploaded:</b>{" "}

              {new Date(datasetDetails.uploaded_at).toLocaleString()}

              <br/><br/>

              <b>Rows:</b> {datasetDetails.rows}

              <br/><br/>

              <b>Columns:</b> {datasetDetails.columns}

              <br/><br/>

              <b>Engines:</b> {datasetDetails.engines}

              <br/><br/>

              <b>Status:</b> {datasetDetails.status}

              <br/><br/>

              <b>Healthy:</b> {datasetDetails.healthy}

              <br/>

              <b>Warning:</b> {datasetDetails.warning}

              <br/>

              <b>Critical:</b> {datasetDetails.critical}

              <br/>

              <b>Average RUL:</b> {Math.round(datasetDetails.avg_rul)}

          </p>

          <div className="confirm-buttons">

              <button
                  className="cancel-btn"
                  onClick={() => setShowView(false)}
              >
                  Close
              </button>

          </div>

      </div>

  </div>

  )
  }

    </>

  );

}

export default DatasetHistory;