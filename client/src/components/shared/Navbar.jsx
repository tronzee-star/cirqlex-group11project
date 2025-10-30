import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/phase5-logo1.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CardContext.jsx";

const guestLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

const authLinks = [];

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const { items } = useCart();

  const links = isAuthenticated ? authLinks : guestLinks;
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasCartItems = cartCount > 0;

  const handleSignOut = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#06372c]/90 backdrop-blur-sm border-b border-[#04241c] shadow-sm z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-white">
        <Link to={isAuthenticated ? "/buyer-dashboard" : "/"} className="flex items-center space-x-2">
          <img src={Logo} alt="Cirqle X Logo" className="h-10 w-10 object-contain drop-shadow" />
        </Link>

        {links.length ? (
          <ul className="flex items-center space-x-6 text-sm font-semibold">
            {links.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-emerald-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-sm font-semibold text-emerald-100">Circular Marketplace</span>
        )}

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="hidden rounded-lg bg-[#0C7A60] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#095c48] sm:inline-flex"
                >
                  Control Centre
                </Link>
              ) : null}
              <div className="hidden h-9 w-px bg-emerald-200/40 sm:block" aria-hidden="true" />
              <span className="hidden text-sm text-emerald-100 sm:inline">
                {isAdmin ? "Hi, Admin" : `Hi, ${user?.name?.split(" ")[0] || "Member"}`}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-red-600 bg-red-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="rounded-lg bg-[#06372c] px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#052a21]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}