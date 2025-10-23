import Layout from './components/shared/Layout';
import Home from './pages/Home';
import BuyerDashboard from './pages/buyerDashboard';
import Shop from './pages/shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Layout>
    </Router>
/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';*/
import Navbar from "./components/shared/Navbar";
import Hero from "./components/shared/Hero";
import Features from "./components/shared/Features";
import ImpactSection from "./components/shared/ImpactSection";
import Footer from "./components/shared/Footer";

/*import Home from './pages/Home';*/
/*import SignUp from './pages/auth/SignUp';*/
/*import SignIn from './pages/auth/SignIn';*/

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <ImpactSection />
      <Footer />
    </>
  );
}

export default App;

