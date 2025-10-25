// Simple Chart.js configuration
const initChart = () => {
  const canvas = document.getElementById('carbonChart');
  if (canvas && typeof Chart !== 'undefined') {
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
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
  }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initChart);