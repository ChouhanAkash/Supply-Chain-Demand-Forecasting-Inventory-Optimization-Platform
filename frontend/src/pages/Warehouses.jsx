import { useState, useEffect } from 'react';
import { getWarehouses } from '../api/api';
import { MdWarehouse, MdError, MdLocationOn } from 'react-icons/md';
import { BiLoaderAlt } from 'react-icons/bi';
import './Warehouses.css';

function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const data = await getWarehouses();
      setWarehouses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load warehouses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <BiLoaderAlt className="spinner" />
        <p>Loading Warehouses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <MdError className="error-icon" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="warehouses-container">
      <div className="warehouses-header">
        <div>
          <h1>Warehouse Management</h1>
          <p>Manage your warehouse locations and capacity</p>
        </div>
        <div className="total-count">
          Total: {warehouses.length}
        </div>
      </div>

      {warehouses.length === 0 ? (
        <div className="empty-state">
          <MdWarehouse className="empty-icon" />
          <h3>No Warehouses Found</h3>
          <p>Add some warehouses to get started</p>
        </div>
      ) : (
        <div className="warehouses-grid">
          {warehouses.map((warehouse) => (
            <div key={warehouse.id} className="warehouse-card">
              <div className="card-header">
                <MdWarehouse className="warehouse-icon" />
                <span className="warehouse-id-badge">ID: {warehouse.id}</span>
              </div>
              <h3 className="warehouse-title">Warehouse {warehouse.id}</h3>
              <div className="warehouse-details">
                <div className="detail-item">
                  <MdLocationOn className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{warehouse.location}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="capacity-info">
                    <span className="detail-label">Capacity</span>
                    <span className="capacity-value">{warehouse.capacity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Warehouses;
