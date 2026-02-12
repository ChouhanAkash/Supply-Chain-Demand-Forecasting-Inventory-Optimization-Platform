import { useState, useEffect } from 'react';
import { getProducts, getWarehouses, forecastDemand, optimizeInventory } from '../api/api';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecastResult, setForecastResult] = useState(null);
  const [optimizationResult, setOptimizationResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, warehousesData] = await Promise.all([
        getProducts(),
        getWarehouses()
      ]);
      setProducts(productsData);
      setWarehouses(warehousesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend is running on port 8000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForecast = async (productId) => {
    try {
      const result = await forecastDemand(productId);
      setForecastResult(result);
    } catch (err) {
      console.error('Forecast failed:', err);
    }
  };

  const handleOptimize = async () => {
    try {
      const result = await optimizeInventory();
      setOptimizationResult(result);
    } catch (err) {
      console.error('Optimization failed:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Supply Chain Dashboard</h1>
        <p>Demand Forecasting & Inventory Optimization Platform</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        {/* Products Section */}
        <section className="dashboard-section">
          <h2>Products</h2>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => handleForecast(product.id)}
                    className="btn-forecast"
                  >
                    Forecast Demand
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-message">No products available</p>
            )}
          </div>
        </section>

        {/* Warehouses Section */}
        <section className="dashboard-section">
          <h2>Warehouses</h2>
          <div className="warehouses-grid">
            {warehouses.length > 0 ? (
              warehouses.map((warehouse) => (
                <div key={warehouse.id} className="warehouse-card">
                  <h3>{warehouse.name}</h3>
                  <div className="warehouse-details">
                    <p><strong>Capacity:</strong> {warehouse.capacity} units</p>
                    <p><strong>Storage Cost:</strong> ${warehouse.storage_cost}/unit</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No warehouses available</p>
            )}
          </div>
        </section>

        {/* Forecast Result */}
        {forecastResult && (
          <section className="dashboard-section result-section">
            <h2>Demand Forecast Result</h2>
            <div className="result-card">
              <p><strong>Product ID:</strong> {forecastResult.product_id}</p>
              <p><strong>Forecasted Demand:</strong> {forecastResult.forecasted_demand} units</p>
            </div>
          </section>
        )}

        {/* Optimization Section */}
        <section className="dashboard-section">
          <h2>Inventory Optimization</h2>
          <button onClick={handleOptimize} className="btn-optimize">
            Optimize Inventory Allocation
          </button>
          
          {optimizationResult && (
            <div className="optimization-results">
              <h3>Optimization Results</h3>
              <p><strong>Total Allocations:</strong> {optimizationResult.total_allocations}</p>
              <div className="allocations-grid">
                {optimizationResult.allocations.map((allocation, index) => (
                  <div key={index} className="allocation-card">
                    <p><strong>Warehouse:</strong> {allocation.warehouse_id}</p>
                    <p><strong>Product:</strong> {allocation.product_id}</p>
                    <p><strong>Quantity:</strong> {allocation.allocated_quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
