import Layout from "../components/Layout";

import ReportHeader from "../components/ReportsHistory/ReportHeader";
import ReportCards from "../components/ReportsHistory/ReportCards";
import PredictionHistory from "../components/ReportsHistory/PredictionHistory";
import DatasetHistory from "../components/ReportsHistory/DatasetHistory";

import "../components/ReportsHistory/ReportsHistory.css";

function ReportsHistory() {

  return (

    <Layout>

      <div className="reports-page">

        <ReportHeader />

        <ReportCards />

        <DatasetHistory />

        <PredictionHistory />


      </div>

    </Layout>

  );

}

export default ReportsHistory;