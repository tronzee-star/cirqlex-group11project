
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from './pages/Home';
import BuyerDashboard from './pages/buyerDashboard';
import SellerDashboard from './pages/sellerDashboard';
import Shop from './pages/shop';
import Sell from './pages/Sell';
import Cart from './pages/cart';
import CheckoutReceipt from './pages/CheckoutReceipt';
import Payouts from './pages/payouts';
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import About from './pages/About';
import ChatWithAI from './pages/ChatWithAI';
import { useAuth } from "./context/AuthContext.jsx";

const PublicLayout = () => (
  <div className="min-h-screen bg-white">
    <Outlet />
    <Footer />
  </div>
);

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const authOnlyRoutes = ['/buyer-dashboard', '/seller-dashboard', '/shop', '/chat-with-ai'];
  const shouldHideFooter = isAuthenticated || authOnlyRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      {shouldHideFooter ? null : <Footer />}
    </div>
  );
};

const ProtectedRoute = ({ redirectTo = "/signin", children }) => {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sell" element={<Sell />} />
      <Route
        path="/buyer-dashboard"
        element={
          <ProtectedRoute>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller-dashboard"
        element={
          <ProtectedRoute>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout/receipt"
        element={
          <ProtectedRoute>
            <CheckoutReceipt />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payouts"
        element={
          <ProtectedRoute>
            <Payouts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat-with-ai"
        element={
          <ProtectedRoute>
            <ChatWithAI />
          </ProtectedRoute>
        }
      />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Router>
  );
}

export default App;

