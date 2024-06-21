import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Raise from './components/Raise';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Request Management System</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/raise" element={<Raise />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
