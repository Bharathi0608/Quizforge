import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, Trophy, LayoutGrid, LogIn } from "lucide-react";

const AppNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Decode user name
  let userName = "";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.name || payload.email;
    } catch {}
  }

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const navItems = [
    { to: "/", label: "Home", icon: Brain },
    { to: "/quizzes", label: "Quizzes", icon: LayoutGrid },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🔥</span>
          <span className="text-gradient">QuizForge</span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}

          {/* ✅ USER SECTION */}
          {token ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm font-medium text-primary">
                👤 {userName}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-2 transition-all ${
                location.pathname === "/auth"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;