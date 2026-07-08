import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import API from "../services/api";

import EngineSelector from "../components/RULPrediction/EngineSelector";
import RULSummaryCards from "../components/RULPrediction/RULSummaryCards";

import "../components/RULPrediction/RULPrediction.css";

import RULTrendChart from "../components/RULPrediction/RULTrendChart";
import RemainingLifeGauge from "../components/RULPrediction/RemainingLifeGauge";
import RiskDistributionChart from "../components/RULPrediction/RiskDistributionChart";
import MaintenanceTimeline from "../components/RULPrediction/MaintenanceTimeline";

function RULPrediction() {

  const [fleet, setFleet] = useState([]);

  const [selectedEngine, setSelectedEngine] =
    useState(1);

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    API.get("/fleet")
      .then((res) => setFleet(res.data));

  }, []);

  useEffect(() => {

    API.get(`/engine/${selectedEngine}/history`)
      .then((res) => setHistory(res.data));

  }, [selectedEngine]);

  if (history.length === 0) {

    return (

      <Layout>

        <h2 style={{ color: "white" }}>
          Loading...
        </h2>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="rul-page">

        <EngineSelector

          fleet={fleet}

          selectedEngine={selectedEngine}

          setSelectedEngine={setSelectedEngine}

        />

        <RULSummaryCards

          latest={history[history.length - 1]}

        />

        <RULTrendChart
  history={history}
/>

<div className="rul-bottom-grid">

  <RemainingLifeGauge
    latest={history[history.length-1]}
  />

  <RiskDistributionChart
    fleet={fleet}
  />

</div>

<MaintenanceTimeline
  latest={history[history.length-1]}
/>

      </div>

    </Layout>

  );

}

export default RULPrediction;