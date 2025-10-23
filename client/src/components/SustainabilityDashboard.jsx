import React, { useEffect, useRef } from 'react';
import './SustainabilityDashboard.css';

const SustainabilityDashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Simple Chart.js setup
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
              data: [12, 19, 15, 25, 22, 30],
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
    <div className="dashboard">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">cirqlex  </h1>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Data</a>
            <a href="#" className="active">Sustainability</a>
            <a href="#">About</a>
          </div>
          <div className="nav-right">
            <input type="text" placeholder="Search..." className="search" />
            <button className="btn-signout">Sign Out</button>
            <div className="avatar">JM</div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Hello, Sofiya Nzau </h2>
            <p>Your Sustainability Impact Highlights</p>
          </div>
          <div className="hero-image">
            <div className="hero-icon"></div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon"></div>
            <div className="kpi-info">
              <h3>Carbon Footprint</h3>
              <p className="kpi-value green">15% lower than last month</p>
            </div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-icon">📈</div>
            <div className="kpi-info">
              <h3>Reduction Progress</h3>
              <p className="kpi-value blue">20% of target achieved</p>
            </div>
          </div>
          
          <div className="kpi-card">
            <div className="score-circle">78</div>
            <div className="kpi-info">
              <h3>Sustainability Score</h3>
              <p className="kpi-value green">Excellent Progress!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <div className="chart-container">
          <h3>Estimated Carbon Footprint Reduction</h3>
          <div className="chart-box">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </section>

      {/* Impact Icons */}
      <section className="impact-section">
        <div className="impact-grid">
          <div className="impact-item">
            <div className="impact-icon">🌳</div>
            <h4>5 Trees Planted</h4>
          </div>
          <div className="impact-item">
            <div className="impact-icon">💧</div>
            <h4>20% Water Saved</h4>
          </div>
          <div className="impact-item">
            <div className="impact-icon">♻️</div>
            <h4>Recycled 3kg Waste</h4>
          </div>
        </div>
      </section>

      {/* Corporate Gifts */}
      <section className="products-section">
        <h3>Corporate Gifts</h3>
        <div className="products-card">
          <div className="gift-icon"></div>
          <h4>Eco-Friendly Corporate Gifts</h4>
          <p>Sustainable options for your business</p>
        </div>
      </section>

      {/* Articles */}
      <section className="articles-section">
        <div className="articles-grid">
          <div className="article-card">
            <span className="article-icon">🌿</span>
            <div className="article-text">
              <h4>Reusable Bottles and Bags</h4>
              <p>Reduce single-use plastics with sustainable alternatives</p>
            </div>
          </div>
          
          <div className="article-card">
            <span className="article-icon">♻️</span>
            <div className="article-text">
              <h4>Choose Sustainable Products</h4>
              <p>Make environmentally conscious purchasing decisions</p>
            </div>
          </div>
          
          <div className="article-card">
            <span className="article-icon">c:\Users\royal\Downloads\phase 5 logo  1@2x.png</span>
            <div className="article-text">
              <h4>Green Tech Trends</h4>
              <p>Latest innovations in sustainable technology</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityDashboard;