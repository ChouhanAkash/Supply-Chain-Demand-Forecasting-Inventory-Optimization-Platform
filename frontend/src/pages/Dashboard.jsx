import { useState, useEffect } from 'react';
import { getProducts, getWarehouses } from '../api/api';
import { MdInventory, MdWarehouse, MdTrendingUp, MdSpeed } from 'react-icons/md';
import { BiLoaderAlt } from 'react-icons/bi';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <BiLoaderAlt className="spinner" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Supply Chain Dashboard</h1>
        <p>Real-time overview of your supply chain operations</p>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <MdInventory className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{products.length}</span>
          </div>
        </div>

        <div className="stat-box">
          <MdWarehouse className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Warehouses</span>
            <span className="stat-value">{warehouses.length}</span>
          </div>
        </div>

        <div className="stat-box">
          <MdTrendingUp className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Forecast Status</span>
            <span className="stat-value">Active</span>
          </div>
        </div>

        <div className="stat-box">
          <MdSpeed className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Performance</span>
            <span className="stat-value">Optimal</span>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Products Overview</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <MdInventory className="product-icon" />
                <span className="product-id">ID: {product.id}</span>
              </div>
              <h3>{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Warehouses</h2>
        <div className="warehouses-grid">
          {warehouses.map((warehouse) => (
            <div key={warehouse.id} className="warehouse-card">
              <div className="warehouse-header">
                <MdWarehouse className="warehouse-icon" />
                <span className="warehouse-id">ID: {warehouse.id}</span>
              </div>
              <h3>{warehouse.location}</h3>
              <div className="warehouse-capacity">
                <span>Capacity:</span>
                <span className="capacity-value">{warehouse.capacity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
