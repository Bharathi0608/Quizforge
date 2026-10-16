import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/config/api";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingHint, setLoadingHint] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  // Show status feedback if request takes longer (e.g. Render free tier cold start)
  useEffect(() => {
    let timer1: any = null;
    let timer2: any = null;

    if (loading) {
      setLoadingHint("Connecting to server...");
      timer1 = setTimeout(() => {
        setLoadingHint("Waking up server (free tier can take ~30s)...");
      }, 4000);
      timer2 = setTimeout(() => {
        setLoadingHint("Contacting database...");
      }, 12000);
    } else {
      setLoadingHint("");
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [loading]);

  // LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);

    try {
      const res = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (res.ok && res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.dispatchEvent(new Event("storage"));
        toast({
          title: "Welcome back! 👋",
          description: `Logged in as ${res.data.user?.name || email}`,
        });
        navigate("/");
      } else {
        const errorMsg =
          res.data?.msg ||
          res.data?.message ||
          (res.status === 503
            ? "Database is currently disconnected. Please check MongoDB Atlas."
            : "Invalid email or password");

        toast({
          title: "Login failed",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Connection Error",
        description: err.message || "Could not connect to the backend server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: displayName.trim() || email.split("@")[0],
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (res.ok) {
        toast({
          title: "Account created 🎉",
          description: "Your account has been registered successfully!",
        });

        // If backend returned token directly, auto-login
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
          window.dispatchEvent(new Event("storage"));
          navigate("/");
          return;
        }

        // Otherwise switch to login mode with credentials prefilled
        setMode("login");
      } else {
        const errorMsg =
          res.data?.msg ||
          res.data?.message ||
          (res.status === 503
            ? "Database is currently disconnected. Please check MongoDB Atlas."
            : "Failed to create account");

        toast({
          title: "Signup failed",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Connection Error",
        description: err.message || "Could not connect to the backend server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-4xl">🔥</span>
          <h1 className="text-3xl font-bold mt-4">
            {mode === "login" ? "Welcome Back" : "Join QuizForge"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === "login"
              ? "Sign in to track your progress and compete"
              : "Create an account to start your journey"}
          </p>
        </div>

        <form
          onSubmit={mode === "login" ? handleLogin : handleSignup}
          className="glass rounded-2xl p-8 space-y-5 border border-border/50 shadow-xl"
        >
          {mode === "signup" && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground ml-1">
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary/60 border border-border/80 focus:border-primary focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-muted-foreground w-4 h-4" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary/60 border border-border/80 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-muted-foreground w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={mode === "signup" ? "At least 6 characters" : "Enter password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary/60 border border-border/80 focus:border-primary focus:outline-none transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          {loadingHint && (
            <p className="text-xs text-center text-muted-foreground animate-pulse mt-2">
              ⏳ {loadingHint}
            </p>
          )}
        </form>

        <div className="text-center mt-6">
          {mode === "login" ? (
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-primary hover:underline font-medium ml-1 cursor-pointer"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-primary hover:underline font-medium ml-1 cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;