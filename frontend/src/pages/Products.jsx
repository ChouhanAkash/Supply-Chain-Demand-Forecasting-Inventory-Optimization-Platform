import { useState, useEffect } from 'react';
import { getProducts } from '../api/api';
import { MdInventory, MdError } from 'react-icons/md';
import { BiLoaderAlt } from 'react-icons/bi';
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
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <BiLoaderAlt className="spinner" />
        <p>Loading Products...</p>
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
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage your product inventory and details</p>
        </div>
        <div className="total-count">
          Total: {products.length}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <MdInventory className="empty-icon" />
          <h3>No Products Found</h3>
          <p>Add some products to get started</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-header">
                <MdInventory className="product-icon" />
                <span className="product-id-badge">ID: {product.id}</span>
              </div>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-details">
                <div className="detail-item">
                  <span className="detail-label">Price</span>
                  <span className="price-value">${product.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-view">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
