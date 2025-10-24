import React, { useEffect, useRef } from 'react';
import './SustainabilityDashboard.css';
import background from '../assets/images/background.jpeg';
import logo from '../assets/logos/logo.svg';   
import chat from '../assets/images/chat score.png';  
import poster from '../assets/images/poster.jpeg';         
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
      {/* AI Introduction Section */}
      <section className="ai-intro-section" style={{ backgroundImage: `url(${poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
              <img src={logo} alt="Cirqlex Logo" className="ai-logo-image" />
              <div className="small-logo-placeholder">
                <span>Go Cirqle <span className="highlight">X</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Welcome Section */}
      <section className="hero-welcome">
        
          <img src={chat} alt="Chat Score" className="hero-image" />
          
        
        <div className="welcome-message">
          {/* <img src={imgDepth4Frame2} alt="User Avatar" className="user-avatar" /> */}
        
          <img src={logo} alt="logo" className="user-avatar-logo" />
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
          <div className="metric-icon trees"></div>
          <div className="metric-text">
            <span className="metric-value">3 Trees</span>
            <span className="metric-label">Planted</span>
          </div>
        </div>
        
        <div className="metric-item">
        
          <div className="metric-icon water"></div>
          <div className="metric-text">
            <span className="metric-value">200L</span>
            <span className="metric-label">water saved</span>
          </div>
        </div>
        
        <div className="metric-item">
          {/* <img src={imgImage5} alt="Recycling" className="metric-icon" /> */}
          <div className="metric-icon recycling"></div>
          <div className="metric-text">
            <span className="metric-value">5KG</span>
            <span className="metric-label">Recycled</span>
          </div>
        </div>
        
        <div className="metric-item">
          {/* <img src={imgImage6} alt="Energy" className="metric-icon" /> */}
          <div className="metric-icon energy"></div>
          <div className="metric-text">
            <span className="metric-value">10 Kwh</span>
            <span className="metric-label">Energy Saved</span>
          </div>
        </div>
      </section>

      {/* Corporate Gifts Section */}
      <section className="corporate-gifts">
        <div className="gifts-container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="gifts-placeholder" style={{ flex: '1', padding: '1rem' }}>
            <h3> Go Green with Your Gifting! </h3>
            <p>Choose Eco-Friendly Corporate Gifts that reflect your brand's commitment to the planet</p>
          </div>
          <img src={background} alt="Go Green with Your Gifting" className="gifts-image" style={{ 
            flex: '1', 
            maxWidth: '50%', 
            height: '300px', 
            objectFit: 'contain', 
            borderRadius: '8px' 
          }} />
        </div>
      </section>

              {/* Sustainability Tips */}
      <section className="sustainability-tips">
        <div className="tip-card">
          <div className="tip-icon"></div>
          <div className="tip-content">
            <h4>Reduce, Reuse, Recycle</h4>
            <p>Minimize waste by reducing consumption, reusing items, and recycling materials.</p>
          </div>
        </div>
        
        <div className="tip-card">
          <div className="tip-icon"></div>
          <div className="tip-content">
            <h4>Choose Sustainable Products</h4>
            <p>Opt for products made from sustainable materials and with minimal environmental impact.</p>
          </div>
        </div>
        
        <div className="tip-card">
          <div className="tip-icon"></div>
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