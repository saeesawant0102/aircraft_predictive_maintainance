import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import FleetOverview from "./pages/FleetOverview";
import EngineDetails from "./pages/EngineDetails";
import SensorAnalysis from "./pages/SensorAnalysis";
import RULPrediction from "./pages/RULPrediction";
import HealthAssessment from "./pages/HealthAssessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/fleet"
          element={<FleetOverview />}
        />

        {/* Engine Details */}
        <Route
          path="/engine/:engineId"
          element={<EngineDetails />}
        />

        <Route
          path="/sensors"
          element={<SensorAnalysis />}
        />

        <Route
          path="/rul"
          element={<RULPrediction />}
        />

        <Route
          path="/health"
          element={<HealthAssessment />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;