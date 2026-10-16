import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("token");

  let userName = "";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.name || payload.email;
    } catch {}
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Quizzes", path: "/quizzes" },
    { label: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass py-3"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="font-bold text-lg text-primary">
          🔥 QuizForge
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-4">

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/40"
                    : "text-muted-foreground hover:bg-yellow-400 hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* USER SECTION */}
          {token ? (
            <div className="flex items-center gap-4 ml-2">

              <span className="text-sm text-yellow-400">
                👤 {userName}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium 
                border border-red-400 text-red-400 
                transition-all duration-300 
                hover:bg-red-400 hover:text-black 
                hover:scale-105 hover:shadow-lg hover:shadow-red-400/40"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="ml-2 px-5 py-2 rounded-lg text-sm font-medium 
              border border-yellow-400 text-yellow-400 
              transition-all duration-300 
              hover:bg-yellow-400 hover:text-black 
              hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/40"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden glass mx-6 mt-3 rounded-xl p-4 space-y-3">

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-yellow-400 text-black"
                    : "text-muted-foreground hover:bg-yellow-400 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {token ? (
            <div className="pt-3 border-t border-border">
              <p className="text-yellow-400 mb-2">👤 {userName}</p>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="block px-4 py-2 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;