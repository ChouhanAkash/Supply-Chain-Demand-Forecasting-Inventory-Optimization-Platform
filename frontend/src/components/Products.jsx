import { useState, useEffect } from 'react';
import { getProducts } from '../api/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <span className="error-icon">⚠️</span>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1>📦 Product Management</h1>
          <p>View and manage your product inventory</p>
        </div>
        <div className="header-stats">
          <span className="total-count">{products.length} Products</span>
        </div>
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <span className="product-icon">📦</span>
                <span className="product-id-badge">#{product.id}</span>
              </div>
              <div className="product-body">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price-section">
                  <span className="price-label">Price</span>
                  <span className="price-value">${product.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="product-actions">
                <button className="btn-view">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No products found</h3>
            <p>Add products to get started with inventory management</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
