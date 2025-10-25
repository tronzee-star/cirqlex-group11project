import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from './pages/Home';
import BuyerDashboard from './pages/buyerDashboard';
import SellerDashboard from './pages/sellerDashboard';
import Shop from './pages/shop';
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      {/* add top padding so fixed navbar doesn't cover content */}
      <div className="pt-16" bg white minn-h-screen>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/shop" element={<Shop />} />
           <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

