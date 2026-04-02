import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  // LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setLoading(false);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: data.msg || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };

  // SIGNUP
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Minimum 6 characters",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: displayName || email.split("@")[0],
          email,
          password
        })
      });

      const data = await res.json();
      setLoading(false);

      if (data.message) {
        toast({ title: "Account created 🎉" });
        setMode("login");
      } else {
        toast({
          title: "Signup failed",
          description: data.msg || "Error",
          variant: "destructive"
        });
      }
    } catch {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">

        <div className="text-center mb-8">
          <span className="text-4xl">🔥</span>
          <h1 className="text-3xl font-bold mt-4">
            {mode === "login" ? "Welcome Back" : "Join QuizForge"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === "login" ? "Sign in to track your progress" : "Create an account"}
          </p>
        </div>

        <form
          onSubmit={mode === "login" ? handleLogin : handleSignup}
          className="glass rounded-2xl p-8 space-y-5"
        >
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-3 rounded-xl bg-secondary border"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl bg-secondary border"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-secondary border"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-white rounded-xl">
            {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          {mode === "login" ? (
            <button onClick={() => setMode("signup")} className="text-primary">Sign up</button>
          ) : (
            <button onClick={() => setMode("login")} className="text-primary">Sign in</button>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default Auth;