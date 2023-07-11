import "./App.css";
import Slip from "./components/slip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div>nitin</div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/padSlip" element={<Slip />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
