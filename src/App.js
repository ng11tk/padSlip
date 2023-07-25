import "./App.css";
import Slip from "./view/slip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./view/dashboard";
import routes from "./routes";
import Enterprises from "./view/enterprises";
import Header from "./components/common/header";

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
