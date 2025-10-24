import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from './pages/Home';
import BuyerDashboard from './pages/buyerDashboard';
import Shop from './pages/shop';
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import SustainabilityDashboard from './components/SustainabilityDashboard';


function App() {
  return (
    <Router>
      <Navbar />
      {/* add top padding so fixed navbar doesn't cover content */}
      <div className="pt-16 bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sustainability" element={<SustainabilityDashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

