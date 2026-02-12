import { useState } from 'react';
import { optimizeInventory } from '../api/api';
import './Optimization.css';

function Optimization() {
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptimize = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await optimizeInventory();
      setOptimizationResult(result);
    } catch (err) {
      setError('Failed to optimize inventory. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="optimization-container">
      <div className="optimization-header">
        <h1>⚡ Inventory Optimization</h1>
        <p>Optimize inventory allocation using linear programming algorithms</p>
      </div>

      <div className="optimization-content">
        <div className="optimization-controls">
          <button 
            onClick={handleOptimize} 
            className="optimize-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Optimizing...
              </>
            ) : (
              <>
                <span className="button-icon">⚡</span>
                Run Optimization
              </>
            )}
          </button>
          <p className="controls-description">
            Uses PuLP linear programming to minimize storage costs while meeting demand constraints
          </p>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {optimizationResult && (
          <div className="optimization-results">
            <div className="results-header">
              <h2>Optimization Results</h2>
              <div className="results-summary">
                <div className="summary-item">
                  <span className="summary-label">Total Allocations</span>
                  <span className="summary-value">{optimizationResult.total_allocations}</span>
                </div>
              </div>
            </div>

            <div className="allocations-grid">
              {optimizationResult.allocations.map((allocation, index) => (
                <div key={index} className="allocation-card">
                  <div className="allocation-header">
                    <span className="allocation-badge">Allocation #{index + 1}</span>
                  </div>
                  
                  <div className="allocation-details">
                    <div className="detail-row">
                      <span className="detail-icon">🏢</span>
                      <div className="detail-content">
                        <span className="detail-label">Warehouse</span>
                        <span className="detail-value">ID: {allocation.warehouse_id}</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <span className="detail-icon">📦</span>
                      <div className="detail-content">
                        <span className="detail-label">Product</span>
                        <span className="detail-value">ID: {allocation.product_id}</span>
                      </div>
                    </div>

                    <div className="detail-row highlight">
                      <span className="detail-icon">📊</span>
                      <div className="detail-content">
                        <span className="detail-label">Allocated Quantity</span>
                        <span className="detail-value quantity">{allocation.allocated_quantity} units</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="optimization-info">
              <h3>💡 Optimization Details</h3>
              <ul>
                <li><strong>Algorithm:</strong> Linear Programming (PuLP solver)</li>
                <li><strong>Objective:</strong> Minimize total storage costs</li>
                <li><strong>Constraints:</strong> Meet demand forecasts & respect warehouse capacity</li>
                <li><strong>Status:</strong> Optimal solution found</li>
              </ul>
            </div>
          </div>
        )}

        {!optimizationResult && !error && (
          <div className="placeholder">
            <div className="placeholder-icon">⚙️</div>
            <h3>Ready to Optimize</h3>
            <p>Click "Run Optimization" to calculate the optimal inventory allocation across your warehouses</p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Minimizes storage costs</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Meets demand requirements</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Respects capacity limits</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Optimization;
