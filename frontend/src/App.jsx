import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Supply Chain Dashboard</h1>
        <p>Demand Forecasting & Inventory Optimization Platform</p>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-grid">
          <div className="card">
            <h2>Products</h2>
            <p>Manage your product inventory</p>
          </div>
          
          <div className="card">
            <h2>Warehouses</h2>
            <p>View warehouse capacity and costs</p>
          </div>
          
          <div className="card">
            <h2>Demand Forecast</h2>
            <p>AI-powered demand predictions</p>
          </div>
          
          <div className="card">
            <h2>Optimize Inventory</h2>
            <p>Optimize allocation across warehouses</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
