import Layout from './components/shared/Layout';
import Home from './pages/Home';
import BuyerDashboard from './pages/buyerDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
