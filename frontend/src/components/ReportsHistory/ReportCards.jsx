import {
  FileText,
  Plane,
  Activity,
  Wrench,
  Eye,
  Download,
} from "lucide-react";

import "./ReportsHistory.css";

function ReportCards() {

  const reports = [

    {
      icon: <Plane size={34} />,
      title: "Fleet Health Report",
      description:
        "Overall fleet health, engine status, critical engines and average RUL.",
    },

    {
      icon: <Activity size={34} />,
      title: "Sensor Analysis Report",
      description:
        "Sensor trends, deviations and anomaly analysis for selected engines.",
    },

    {
      icon: <Wrench size={34} />,
      title: "Maintenance Report",
      description:
        "Maintenance recommendations, inspection schedule and failure timeline.",
    },

    {
      icon: <FileText size={34} />,
      title: "Engine Performance Report",
      description:
        "Detailed engine health score, sensor readings and RUL prediction.",
    },

  ];

  return (

    <div className="reports-grid">

      {reports.map((report,index)=>(

        <div
          className="report-card"
          key={index}
        >

          <div className="report-top">

            <div className="report-icon">

              {report.icon}

            </div>

            <div>

              <h2>

                {report.title}

              </h2>

              <p>

                {report.description}

              </p>

            </div>

          </div>

          <div className="report-actions">

            <button className="preview-btn">

              <Eye size={18}/>

              Preview

            </button>

            <button className="download-btn">

              <Download size={18}/>

              Download PDF

            </button>

          </div>

        </div>

      ))}

    </div>

  );

}

export default ReportCards;