
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
import Sustainability from './pages/sustainability';
import AdminDashboard from './pages/adminDashboard';
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
  const authOnlyRoutes = ['/buyer-dashboard', '/seller-dashboard', '/shop', '/chat-with-ai', '/sustainability', '/admin'];
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

const ProtectedRoute = ({ redirectTo = "/signin", allowedRoles, children }) => {
  const { isAuthenticated, isReady, role } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const normalizedRole = (role || "").toLowerCase();

  if (Array.isArray(allowedRoles) && allowedRoles.length) {
    const allowed = allowedRoles.some((item) => item.toLowerCase() === normalizedRole);
    if (!allowed) {
      if (normalizedRole === "admin") {
        return <Navigate to="/admin" replace />;
      }
      if (normalizedRole === "vendor") {
        return <Navigate to="/seller-dashboard" replace />;
      }
      return <Navigate to="/buyer-dashboard" replace />;
    }
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
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
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
      <Route
        path="/sustainability"
        element={
          <ProtectedRoute>
            <Sustainability />
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

