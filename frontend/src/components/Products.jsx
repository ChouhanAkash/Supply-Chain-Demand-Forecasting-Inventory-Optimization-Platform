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
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <p>Manage your product inventory</p>
      </div>

      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-id">ID: {product.id}</p>
              </div>
              <div className="product-price">
                <span className="price-label">Price</span>
                <span className="price-value">${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No products found</p>
            <p className="empty-subtitle">Add products to get started</p>
          </div>
        )}
      </div>

      <div className="products-stats">
        <p>Total Products: <strong>{products.length}</strong></p>
      </div>
    </div>
  );
}

export default Products;
