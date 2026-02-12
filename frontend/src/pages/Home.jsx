import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Supply Chain Management
            <span className="hero-subtitle">AI-Powered Platform</span>
          </h1>
          <p className="hero-description">
            Optimize your inventory, forecast demand with machine learning, and streamline 
            warehouse operations with advanced linear programming algorithms.
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              <span>Get Started</span>
              <span className="btn-icon">→</span>
            </Link>
            <Link to="/forecast" className="btn btn-secondary">
              <span>Try Forecasting</span>
              <span className="btn-icon">🔮</span>
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <span className="stat-value">Products</span>
            <span className="stat-label">Management</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🏢</span>
            <span className="stat-value">Warehouses</span>
            <span className="stat-label">Optimization</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🤖</span>
            <span className="stat-value">ML Forecast</span>
            <span className="stat-label">Predictions</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">LP Solver</span>
            <span className="stat-label">Allocation</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-Time Analytics</h3>
            <p>Monitor your supply chain performance with live dashboards and comprehensive metrics.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Demand Forecasting</h3>
            <p>Leverage RandomForest ML models to predict demand with high accuracy and confidence.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Inventory Optimization</h3>
            <p>Use PuLP linear programming to minimize costs while meeting all demand constraints.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Product Management</h3>
            <p>Comprehensive product catalog with pricing, inventory levels, and sales tracking.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏭</div>
            <h3>Warehouse Control</h3>
            <p>Manage multiple warehouses with capacity tracking and storage cost optimization.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>API Integration</h3>
            <p>RESTful API built with FastAPI for seamless integration with existing systems.</p>
          </div>
        </div>
      </section>

      <section className="tech-section">
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-badge">Backend</span>
            <span>FastAPI + Python</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">Frontend</span>
            <span>React + Vite</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">ML</span>
            <span>Scikit-learn</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">Optimization</span>
            <span>PuLP Solver</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">Database</span>
            <span>SQLAlchemy + SQLite</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">API</span>
            <span>Axios + REST</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
