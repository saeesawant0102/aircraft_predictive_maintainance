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

  const previewReport = (title) => {

    const routes = {

      "Fleet Health Report": "fleet",

      "Sensor Analysis Report": "sensors",

      "Maintenance Report": "maintenance",

      "Engine Performance Report": "engine",

    };

    window.open(

      `http://127.0.0.1:8000/reports/${routes[title]}`,

      "_blank"

    );

  };

  const downloadReport = async (title) => {

  const routes = {

    "Fleet Health Report": {
      endpoint: "fleet",
      filename: "Fleet_Health_Report.pdf",
    },

    "Sensor Analysis Report": {
      endpoint: "sensors",
      filename: "Sensor_Analysis_Report.pdf",
    },

    "Maintenance Report": {
      endpoint: "maintenance",
      filename: "Maintenance_Report.pdf",
    },

    "Engine Performance Report": {
      endpoint: "engine",
      filename: "Engine_Performance_Report.pdf",
    },

  };

  try {

    const response = await fetch(

      `http://127.0.0.1:8000/reports/${routes[title].endpoint}`

    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = routes[title].filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  }

  catch (err) {

    console.error(err);

    alert("Failed to download report.");

  }

};

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

      {reports.map((report, index) => (

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

            <button
              className="preview-btn"
              onClick={() => previewReport(report.title)}
            >

              <Eye size={18}/>

              Preview

            </button>

            <button
              className="download-btn"
              onClick={() => downloadReport(report.title)}
            >

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