import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from './pages/Home';
import BuyerDashboard from './pages/buyerDashboard';
import Shop from './pages/shop';

function App() {
  return (
    <Router>
      <Navbar />
      {/* add top padding so fixed navbar doesn't cover content */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

