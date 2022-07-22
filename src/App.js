import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestSubmission from "./screens/testSubmission/TestSubmission";
import MainMenu from "./screens/mainMenu/MainMenu";
import Dashboard from "./screens/employerDashboard/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/submission" element={<TestSubmission />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<MainMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
