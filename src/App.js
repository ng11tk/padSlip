import "./App.css";
import Slip from "./view/slip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./view/dashboard";
import routes from "./routes";
import Enterprises from "./view/enterprises";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route path={routes.padSlip} element={<Slip />} />
            <Route path={routes.enterprises} element={<Enterprises />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
