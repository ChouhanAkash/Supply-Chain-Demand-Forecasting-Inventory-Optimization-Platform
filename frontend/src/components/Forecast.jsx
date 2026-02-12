import { useState, useEffect } from 'react';
import { getProducts, forecastDemand } from '../api/api';
import './Forecast.css';

function Forecast() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [forecastResult, setForecastResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      if (data.length > 0) {
        setSelectedProductId(data[0].id);
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    }
  };

  const handleForecast = async (e) => {
    e.preventDefault();
    
    if (!selectedProductId) {
      setError('Please select a product');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await forecastDemand(parseInt(selectedProductId));
      setForecastResult(result);
    } catch (err) {
      setError('Failed to get forecast. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find(p => p.id === parseInt(selectedProductId));

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <h1>Demand Forecast</h1>
        <p>AI-powered demand predictions for your products</p>
      </div>

      <div className="forecast-content">
        <form onSubmit={handleForecast} className="forecast-form">
          <div className="form-group">
            <label htmlFor="product-select">Select Product</label>
            <select
              id="product-select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="product-select"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="forecast-button"
            disabled={loading || !selectedProductId}
          >
            {loading ? 'Forecasting...' : 'Generate Forecast'}
          </button>
        </form>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {forecastResult && (
          <div className="forecast-result">
            <h2>Forecast Result</h2>
            <div className="result-card">
              <div className="result-header">
                <h3>{selectedProduct?.name}</h3>
                <span className="product-badge">ID: {forecastResult.product_id}</span>
              </div>
              
              <div className="result-body">
                <div className="result-metric">
                  <span className="metric-label">Forecasted Demand</span>
                  <span className="metric-value">{forecastResult.forecasted_demand}</span>
                  <span className="metric-unit">units</span>
                </div>
              </div>

              <div className="result-footer">
                <p className="result-note">
                  💡 This forecast is generated using machine learning algorithms based on historical data patterns
                </p>
              </div>
            </div>
          </div>
        )}

        {!forecastResult && !error && (
          <div className="placeholder">
            <div className="placeholder-icon">📊</div>
            <p>Select a product and click "Generate Forecast" to see AI-powered demand predictions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast;
