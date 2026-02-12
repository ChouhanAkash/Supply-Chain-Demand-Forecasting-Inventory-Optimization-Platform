import { NavLink } from 'react-router-dom';
import { MdHome, MdDashboard, MdInventory, MdTrendingUp, MdSettings, MdWarehouse } from 'react-icons/md';
import { BiBarChartAlt2 } from 'react-icons/bi';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <BiBarChartAlt2 className="logo-icon" />
          <span>SupplyChain Pro</span>
        </div>
        
        <div className="nav-links">
          <NavLink to="/" className="navbar-link">
            <MdHome />
            <span>Home</span>
          </NavLink>
          
          <NavLink to="/dashboard" className="navbar-link">
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/products" className="navbar-link">
            <MdInventory />
            <span>Products</span>
          </NavLink>
          
          <NavLink to="/warehouses" className="navbar-link">
            <MdWarehouse />
            <span>Warehouses</span>
          </NavLink>
          
          <NavLink to="/forecast" className="navbar-link">
            <MdTrendingUp />
            <span>Forecast</span>
          </NavLink>
          
          <NavLink to="/optimization" className="navbar-link">
            <MdSettings />
            <span>Optimize</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
