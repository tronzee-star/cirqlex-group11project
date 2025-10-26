import React, { useEffect, useRef } from 'react';
import './SustainabilityDashboard.css';

// Figma assets - you'll need to copy these to your assets folder
// import imgPhase5Logo1 from '../assets/logos/phase5-logo.png';
// import imgDepth4Frame2 from '../assets/images/user-avatar.png';
// import imgImage10 from '../assets/images/sustainability-hero.png';
// import imgImage5 from '../assets/images/recycling-icon.png';
// import imgImage6 from '../assets/images/energy-icon.png';
// import imgRectangle from '../assets/images/water-icon.png';
// import imgImage4 from '../assets/images/tree-icon.png';
// import imgGoGreenWithYourGifting from '../assets/images/corporate-gifts.png';
// import imgRectangle31 from '../assets/images/ai-bg-1.png';
// import imgRectangle33 from '../assets/images/ai-bg-2.png';

const SustainabilityDashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Chart.js setup for carbon reduction chart
    const loadChart = async () => {
      try {
        const Chart = await import('chart.js/auto');
        const ctx = chartRef.current?.getContext('2d');
        
        if (!ctx) return;

        new Chart.default(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Carbon Footprint Reduction (%)',
              data: [12, 15, 18, 22, 25, 30],
              borderColor: '#4D9966',
              backgroundColor: 'rgba(77, 153, 102, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: '#E8F2EB' }
              },
              x: {
                grid: { display: false }
              }
            }
          }
        });
      } catch (err) {
        console.log('Chart.js not loaded');
      }
    };

    loadChart();
  }, []);

  return (
    <div className="main-sustainability">
      {/* Header/Navigation */}
      <header className="header">
        <div className="nav-container">
          <div className="logo-section">
            {/* <img src={imgPhase5Logo1} alt="Phase 5 Logo" className="main-logo" /> */}
            <div className="logo-placeholder">cirqlex</div>
          </div>
          
          <nav className="navigation">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Buy</a>
            <a href="#" className="nav-link">Sell</a>
            <a href="#" className="nav-link active">sustainability</a>
            <a href="#" className="nav-link">About us</a>
          </nav>
          
          <div className="nav-actions">
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <button className="logout-btn">log out</button>
            <div className="user-avatar">
              {/* <img src={imgDepth4Frame2} alt="User Avatar" /> */}
              <div className="avatar-placeholder">SN</div>
            </div>
          </div>
        </div>
      </header>

      {/* AI Introduction Section */}
      <section className="ai-intro-section">
        <div className="ai-container">
          <div className="ai-text-section">
            <p className="welcome-text">Welcome Back</p>
            <p className="ai-description">
              cirqlex uses Artificial intelligence<br />
              to track and suggest<br />
              for you.
            </p>
          </div>
          <div className="ai-visual-section">
            <div className="cirqlex-logo-small">
              {/* <img src={imgPhase5Logo1} alt="Cirqlex Logo" /> */}
              <div className="small-logo-placeholder">
                <span>Go Cirqle <span className="highlight">X</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Welcome Section */}
      <section className="hero-welcome">
        <div className="hero-image-container">
          {/* <img src={imgImage10} alt="Sustainability Hero" className="hero-image" /> */}
          <div className="hero-image-placeholder">🌱</div>
        </div>
        <div className="welcome-message">
          <h1>
            Hello, <span className="user-name">Sofiya Nzau</span>! Here is your Impact.
          </h1>
          <p className="impact-summary">
            You've saved 12 kg of CO2 this month! That's equivalent to not driving a car for 35 miles.
          </p>
        </div>
      </section>

      {/* Insights Header */}
      <section className="insights-header">
        <h2>Your Sustainability Insights</h2>
      </section>

      {/* KPI Cards */}
      <section className="kpi-cards">
        <div className="kpi-card">
          <h3>Carbon Footprint</h3>
          <div className="kpi-value">15%</div>
          <div className="kpi-change negative">-5%</div>
        </div>
        
        <div className="kpi-card">
          <h3>Waste Reduction</h3>
          <div className="kpi-value">20%</div>
          <div className="kpi-change positive">+10%</div>
        </div>
        
        <div className="kpi-card">
          <h3>Sustainable Purchases</h3>
          <div className="kpi-value">25%</div>
          <div className="kpi-change positive">+15%</div>
          <div className="kpi-period">Last 6 Months</div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <div className="chart-header">
          <h3>Carbon Reduction Over Time</h3>
          <div className="chart-value">20%</div>
          <div className="chart-change">
            <span className="time-period">Last 6 Months</span>
            <span className="change-value positive">+5%</span>
          </div>
        </div>
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="impact-metrics">
        <div className="metric-item">
          {/* <img src={imgImage4} alt="Trees" className="metric-icon" /> */}
          <div className="metric-icon trees">🌳</div>
          <div className="metric-text">
            <span className="metric-value">3 Trees</span>
            <span className="metric-label">Planted</span>
          </div>
        </div>
        
        <div className="metric-item">
          {/* <img src={imgRectangle} alt="Water" className="metric-icon" /> */}
          <div className="metric-icon water">💧</div>
          <div className="metric-text">
            <span className="metric-value">200L</span>
            <span className="metric-label">water saved</span>
          </div>
        </div>
        
        <div className="metric-item">
          {/* <img src={imgImage5} alt="Recycling" className="metric-icon" /> */}
          <div className="metric-icon recycling">♻️</div>
          <div className="metric-text">
            <span className="metric-value">5KG</span>
            <span className="metric-label">Recycled</span>
          </div>
        </div>
        
        <div className="metric-item">
          {/* <img src={imgImage6} alt="Energy" className="metric-icon" /> */}
          <div className="metric-icon energy">⚡</div>
          <div className="metric-text">
            <span className="metric-value">10 Kwh</span>
            <span className="metric-label">Energy Saved</span>
          </div>
        </div>
      </section>

      {/* Corporate Gifts Section */}
      <section className="corporate-gifts">
        <div className="gifts-container">
          {/* <img src={imgGoGreenWithYourGifting} alt="Corporate Gifts" className="gifts-image" /> */}
          <div className="gifts-placeholder">
            <h3>🌱 Go Green with Your Gifting! �</h3>
            <p>Choose Eco-Friendly Corporate Gifts that reflect your brand's commitment to the planet</p>
          </div>
        </div>
      </section>

      {/* Sustainability Tips */}
      <section className="sustainability-tips">
        <div className="tip-card">
          <div className="tip-icon">🔄</div>
          <div className="tip-content">
            <h4>Reduce, Reuse, Recycle</h4>
            <p>Minimize waste by reducing consumption, reusing items, and recycling materials.</p>
          </div>
        </div>
        
        <div className="tip-card">
          <div className="tip-icon">🌿</div>
          <div className="tip-content">
            <h4>Choose Sustainable Products</h4>
            <p>Opt for products made from sustainable materials and with minimal environmental impact.</p>
          </div>
        </div>
        
        <div className="tip-card">
          <div className="tip-icon">💧</div>
          <div className="tip-content">
            <h4>Conserve Water and Energy</h4>
            <p>Save resources by conserving water and energy at home and in your daily life.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityDashboard;