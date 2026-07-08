import { useState } from "react";
import { Upload, Rocket, FileText } from "lucide-react";
import API from "../services/api";
import "./UploadPanel.css";

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

      await API.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    <div className="upload-card">

      <div className="upload-icon">
        <Upload size={42} />
      </div>

      <h2>Upload Engine Dataset</h2>

      <p>
        Upload a CMAPSS CSV dataset for engine health
        assessment and Remaining Useful Life prediction.
      </p>

      <div className="selected-file">

        {file ? (
          <>
            <FileText size={18} />
            <span>{file.name}</span>
          </>
        ) : (
          <>
            <FileText size={18} />
            <span>No file selected</span>
          </>
        )}

      </div>

      <label className="browse-btn">
        Browse CSV
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
      </label>

      <button
        className="predict-btn"
        disabled={loading}
        onClick={handlePredict}
      >
        <Rocket size={18} />

        {loading
          ? "Running Prediction..."
          : "Run Prediction"}
      </button>

    </div>
  );
}

export default UploadPanel;