import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sustainability = () => {
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
      
      try {
        const payload = user?.id ? { buyer_id: user.id, timeframe_days: 180 } : {};
        const response = await fetch(`${API_BASE}/insights/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          setInsights(data.insights);
        }
      } catch (err) {
        console.error('Failed to fetch insights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [user]);

  useEffect(() => {
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

    if (!loading) {
      loadChart();
    }
  }, [loading]);

  const co2Saved = insights?.impact?.co2_saved || '0.0 kg';
  const wasteReduced = insights?.impact?.waste_reduced || '0.0 kg';
  const treesSaved = insights?.impact?.trees_saved || 0;
  const sustainabilityScore = insights?.sustainability_score || 0;

  return (
    <div className="min-h-screen bg-[#0C7A60] pt-20">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 pb-10">
        {/* Hero Section with Image */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF9933] to-[#FFB366] p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                alt="Sustainable lifestyle"
                className="h-48 w-full rounded-2xl object-cover shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-right">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#B872D2] text-3xl font-bold text-white shadow-lg">
                B
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Message */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Hello, <span className="text-[#FFB366]">{user?.name || 'Friend'}</span>!
          </h2>
          <p className="mt-2 text-lg text-white/90">Your Sustainability Impact</p>
        </section>

        {/* KPI Cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
            <p className="mt-2 text-3xl font-bold text-[#0C7A60]">
              {insights?.metrics?.orders_analyzed || 0}
            </p>
          </div>
          
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-gray-600">CO₂ Saved</h3>
            <p className="mt-2 text-3xl font-bold text-[#0C7A60]">{co2Saved}</p>
          </div>
          
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-gray-600">Circular Purchases</h3>
            <p className="mt-2 text-3xl font-bold text-[#0C7A60]">
              {insights?.metrics?.reuse_rate_pct || 0}%
            </p>
          </div>
          
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-gray-600">Sustainability Score</h3>
            <div className="mt-2 flex items-center gap-3">
              <div className="relative h-16 w-16">
                <svg className="h-16 w-16 -rotate-90 transform">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#E5E7EB"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#0C7A60"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${(sustainabilityScore / 100) * 175.93} 175.93`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#0C7A60]">{sustainabilityScore}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Reduced Carbon Footprint Over Time</h3>
            <span className="text-sm text-gray-500">Last 6 Months</span>
          </div>
          <div className="h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        </section>

        {/* Impact Metrics Icons */}
        <section className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-3 text-5xl">🌱</div>
            <p className="text-2xl font-bold text-[#0C7A60]">{treesSaved}</p>
            <p className="text-sm text-gray-600">Trees Saved</p>
          </div>
          
          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-3 text-5xl">💧</div>
            <p className="text-2xl font-bold text-[#0C7A60]">200L</p>
            <p className="text-sm text-gray-600">Water Saved</p>
          </div>
          
          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-3 text-5xl">♻️</div>
            <p className="text-2xl font-bold text-[#0C7A60]">{wasteReduced}</p>
            <p className="text-sm text-gray-600">Waste Reduced</p>
          </div>
          
          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-3 text-5xl">🌍</div>
            <p className="text-2xl font-bold text-[#0C7A60]">{co2Saved}</p>
            <p className="text-sm text-gray-600">CO₂ Offset</p>
          </div>
        </section>

        {/* Eco-Friendly Products Section */}
        <section className="mb-8 overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80"
              alt="Eco-friendly products"
              className="h-80 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00A651] px-4 py-2 text-sm font-semibold">
                <span>🌿</span>
                <span>Eco Friendly</span>
              </div>
              <h3 className="text-2xl font-bold">Choose Sustainable Products</h3>
              <p className="mt-2 text-white/90">
                Every purchase makes a difference. Shop circular and reduce your carbon footprint.
              </p>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        {insights?.recommendations && insights.recommendations.length > 0 && (
          <section className="mb-8 rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Sustainability Tips</h3>
            <div className="space-y-3">
              {insights.recommendations.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
                  <span className="text-2xl">💡</span>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/buyer-dashboard')}
            className="rounded-full bg-white px-8 py-3 font-semibold text-[#0C7A60] shadow-md transition hover:bg-white/90"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default Sustainability;
