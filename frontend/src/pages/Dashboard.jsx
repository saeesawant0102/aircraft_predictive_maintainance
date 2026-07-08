import Layout from "../components/Layout";
import UploadPanel from "../components/UploadPanel";
import KPICards from "../components/KPICards";
import FleetTable from "../components/FleetTable";
import HealthDistribution from "../components/HealthDistribution";

import "../components/FleetTable.css";

function Dashboard() {
  return (
    <Layout>

      <UploadPanel />

      <KPICards />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <FleetTable />

        <HealthDistribution />
      </div>

    </Layout>
  );
}

export default Dashboard;