export default function Home({ onNavigate }) {
  return (
    <div className="home-container">
      {/* Aurora glow blobs behind hero */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>

      <div className="hero-section">
        <div className="hero-pill">
          <span className="pulse-dot"></span>
          <span>Three-Tier Cloud Architecture Deployed</span>
        </div>
        
        <h1 className="hero-title">
          Student Information <br />
          <span className="gradient-text">Management System</span>
        </h1>
        
        <p className="hero-description">
          A high-performance, modular web application built with independently scalable tiers across 
          <strong> Vercel</strong>, <strong>Render</strong>, and <strong>MongoDB Atlas</strong>.
        </p>
        
        <div className="hero-actions">
          <button className="btn-hero" onClick={() => onNavigate('student-data')}>
            <span>📂 Launch Student Portal</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>

        {/* 3-Tier Architecture Live Preview Banner */}
        <div className="tier-architecture-bar">
          <div className="tier-node">
            <span className="tier-badge">Tier 1 • Frontend</span>
            <span className="tier-host">🌐 Vercel</span>
          </div>
          <div className="tier-connector">── REST API ──▶</div>
          <div className="tier-node">
            <span className="tier-badge">Tier 2 • Backend</span>
            <span className="tier-host">⚙️ Render</span>
          </div>
          <div className="tier-connector">── TLS / Mongoose ──▶</div>
          <div className="tier-node">
            <span className="tier-badge">Tier 3 • Database</span>
            <span className="tier-host">🗄️ MongoDB Atlas</span>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-card">
          <div className="feature-icon">☁️</div>
          <h3>Independently Scaled</h3>
          <p>The presentation layer on Vercel and application server on Render can scale horizontally without touching the database.</p>
        </div>
        <div className="feature-card glass-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure & Isolated</h3>
          <p>Database credentials never touch the browser. All queries are securely sanitized through Render Node/Express REST APIs.</p>
        </div>
        <div className="feature-card glass-card">
          <div className="feature-icon">⚡</div>
          <h3>Modern Glassmorphism</h3>
          <p>Ultra-responsive, accessible interface built with React 19, Vite, and seamless continuous cloud deployment.</p>
        </div>
      </div>
    </div>
  );
}
