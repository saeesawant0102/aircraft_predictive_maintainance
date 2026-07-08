import { useState } from "react";
import API from "../services/api";

function UploadPanel() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await API.post(
        "/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Prediction completed successfully!");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#051F2B",
        border: "1px solid #0B556B",
        borderRadius: "20px",
        padding: "25px",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          color: "#00F5D4",
          marginBottom: "15px",
        }}
      >
        Upload Engine Dataset
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          marginLeft: "15px",
          background: "#00F5D4",
          color: "#02111B",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading
          ? "Running..."
          : "Run Prediction"}
      </button>
    </div>
  );
}

export default UploadPanel;