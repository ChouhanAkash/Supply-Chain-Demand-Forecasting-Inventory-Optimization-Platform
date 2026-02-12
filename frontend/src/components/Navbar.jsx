import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">Supply Chain AI</span>
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className={`navbar-link ${isActive('/')}`}>
              <span className="nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard')}`}>
              <span className="nav-icon">📈</span>
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/products" className={`navbar-link ${isActive('/products')}`}>
              <span className="nav-icon">📦</span>
              Products
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/forecast" className={`navbar-link ${isActive('/forecast')}`}>
              <span className="nav-icon">🔮</span>
              Forecast
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/optimize" className={`navbar-link ${isActive('/optimize')}`}>
              <span className="nav-icon">⚡</span>
              Optimize
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
