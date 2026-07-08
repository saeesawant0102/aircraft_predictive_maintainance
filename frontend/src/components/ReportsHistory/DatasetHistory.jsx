import {
  Database,
  Eye,
  Trash2,
} from "lucide-react";

import "./ReportsHistory.css";

function DatasetHistory() {

  const datasets = [

    {
      name:"CMAPSS_FD001.csv",
      uploaded:"08 Jul 2026",
      records:"20,631",
      status:"Processed",
    },

    {
      name:"CMAPSS_FD002.csv",
      uploaded:"07 Jul 2026",
      records:"53,759",
      status:"Processed",
    },

    {
      name:"Fleet_Test_Data.csv",
      uploaded:"05 Jul 2026",
      records:"15,842",
      status:"Processed",
    },

  ];

  return (

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

            <th>Records</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {datasets.map((file,index)=>(

            <tr key={index}>

              <td>

                <div className="dataset-name">

                  <Database
                    size={18}
                  />

                  {file.name}

                </div>

              </td>

              <td>

                {file.uploaded}

              </td>

              <td>

                {file.records}

              </td>

              <td>

                <span className="status-green">

                  {file.status}

                </span>

              </td>

              <td>

                <div className="dataset-actions">

                  <button
                    className="view-btn"
                  >

                    <Eye
                      size={17}
                    />

                  </button>

                  <button
                    className="delete-btn"
                  >

                    <Trash2
                      size={17}
                    />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default DatasetHistory;