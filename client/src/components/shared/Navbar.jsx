import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/phase5-logo1.png";
import { useAuth } from "../../context/AuthContext.jsx";

const guestLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
];

const authLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Buy", to: "/shop" },
  { label: "Sell", to: "/seller-dashboard" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const links = isAuthenticated ? authLinks : guestLinks;

  const handleSignOut = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to={isAuthenticated ? "/buyer-dashboard" : "/"} className="flex items-center space-x-2">
          <img src={Logo} alt="Cirqle X Logo" className="h-10 w-10 object-contain" />
        </Link>

        <ul className="flex items-center space-x-8 text-sm font-semibold text-gray-700">
          {links.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="transition hover:text-[#0C7A60]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-gray-500 sm:inline">Hi, {user?.name?.split(" ")[0] || "Member"}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-[#0C7A60] px-4 py-1.5 text-sm font-medium text-[#0C7A60] transition hover:bg-[#0C7A60] hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="rounded-lg bg-[#0C7A60] px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#095c48]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
