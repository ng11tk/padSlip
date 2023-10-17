import "./App.css";
import Slip from "./view/slip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./view/dashboard";
import routes from "./routes";
import Enterprises from "./view/enterprises";
import Header from "./components/common/header";
import EnterpriseDetails from "./view/enterprises/enterpriseDetails";
import Records from "./view/records";
import Statistics from "./view/statistics";
import Settings from "./view/settings";

function App() {
  return (
    <Router>
      <div className="App m-2">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route path={routes.padSlip} element={<Slip />} />
            <Route path={routes.enterprises} element={<Enterprises />} />
            <Route
              path={routes.enterpriseDetails}
              element={<EnterpriseDetails />}
            />
            <Route path={routes.records} element={<Records />} />
            <Route path={routes.statistics} element={<Statistics />} />
            <Route path={routes.settings} element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
