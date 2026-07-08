import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";
import Layout from "../components/Layout";

import RecommendationCard from "../components/EngineDetails/RecommendationCard";
import SensorHealthCards from "../components/EngineDetails/SensorHealthCards";
import OperatingConditions from "../components/EngineDetails/OperatingConditions";
import SensorTable from "../components/EngineDetails/SensorTable";

import "../components/EngineDetails/EngineDetails.css";

function EngineDetails() {
  const navigate = useNavigate();

  const { engineId } = useParams();

  const [engine, setEngine] = useState(null);

  useEffect(() => {
    API.get(`/engine/${engineId}`)
      .then((res) => setEngine(res.data))
      .catch((err) => console.log(err));
  }, [engineId]);

  if (!engine)
    return (
      <Layout>
        <h2 style={{ color: "white" }}>
          Loading Engine...
        </h2>
      </Layout>
    );

  const statusColor = () => {
    switch (engine.Health_Status) {
      case "Healthy":
        return "#38D27A";

      case "Warning":
        return "#FFBE0B";

      default:
        return "#FF4D4F";
    }
  };

  return (
    <Layout>
      <div className="engine-page">

        <div className="engine-header">

          <div className="engine-title">

            <h1>
              Engine {engine.engine_id}
            </h1>

            <p>
              Detailed health information and prediction results
            </p>

          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/fleet")}
          >
            ← Back to Fleet
          </button>

        </div>

        {/* Summary Cards */}

        <div className="summary-grid">

          <div className="summary-card">

            <div className="summary-title">
              Health Status
            </div>

            <div
              className="summary-value"
              style={{
                color: statusColor(),
              }}
            >
              {engine.Health_Status}
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-title">
              Current Cycle
            </div>

            <div className="summary-value summary-cyan">
              {engine.cycle}
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-title">
              Health Score
            </div>

            <div className="summary-value summary-green">
              {engine.Health_Score}%
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-title">
              Predicted RUL
            </div>

            <div className="summary-value summary-yellow">
              {Math.round(engine.Predicted_RUL)}
            </div>

          </div>

        </div>

        {/* Maintenance Recommendation */}

        <RecommendationCard
          recommendation={engine.Recommendation}
          status={engine.Health_Status}
        />

        {/* Critical Sensor Analysis */}

        <SensorHealthCards
          engine={engine}
        />

        {/* Operating Conditions */}

        <OperatingConditions
          engine={engine}
        />

        {/* Complete Sensor Table */}

        <SensorTable
          engine={engine}
        />

      </div>
    </Layout>
  );
}

export default EngineDetails;