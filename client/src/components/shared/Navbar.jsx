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
  const { isAuthenticated, logout, user } = useAuth();
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
              <Link
                to="/cart"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0C7A60]/20 text-emerald-100 transition hover:bg-[#0C7A60]/40"
                aria-label="View cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
                </svg>
                <span
                  className={`absolute -right-1 -top-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF6B6B] px-1 text-[11px] font-semibold text-white ${
                    hasCartItems ? '' : 'scale-0'
                  } transition-transform`}
                >
                  {cartCount}
                </span>
              </Link>
              <span className="hidden text-sm text-emerald-100 sm:inline">Hi, {user?.name?.split(" ")[0] || "Member"}</span>
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