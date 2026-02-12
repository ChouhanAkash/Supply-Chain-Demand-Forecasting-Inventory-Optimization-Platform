import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Forecast from './components/Forecast';
import Optimization from './components/Optimization';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/optimize" element={<Optimization />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
