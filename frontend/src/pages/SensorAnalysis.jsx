import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import API from "../services/api";

import SensorSelector from "../components/SensorAnalysis/SensorSelector";
import SensorSummaryCards from "../components/SensorAnalysis/SensorSummaryCards";
import SensorTrendChart from "../components/SensorAnalysis/SensorTrendChart";
import SensorComparisonChart from "../components/SensorAnalysis/SensorComparisonChart";
import SensorStatsTable from "../components/SensorAnalysis/SensorStatsTable";

import "../components/SensorAnalysis/SensorAnalysis.css";

function SensorAnalysis() {

    const [fleet, setFleet] = useState([]);

    const [selectedEngine, setSelectedEngine] =
        useState(1);

    const [history, setHistory] = useState([]);

    useEffect(() => {

        API.get("/fleet")
            .then(res => setFleet(res.data));

    }, []);

    useEffect(() => {

        API.get(`/engine/${selectedEngine}/history`)
            .then(res => setHistory(res.data));

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

            <div className="sensor-page">

                <SensorSelector

                    fleet={fleet}

                    selectedEngine={selectedEngine}

                    setSelectedEngine={setSelectedEngine}

                />

                <SensorSummaryCards

                    latest={history[history.length-1]}

                />

                <SensorTrendChart

                    history={history}

                />

                <SensorComparisonChart

                    latest={history[history.length-1]}

                />

                <SensorStatsTable

                    latest={history[history.length-1]}

                />

            </div>

        </Layout>

    );

}

export default SensorAnalysis;