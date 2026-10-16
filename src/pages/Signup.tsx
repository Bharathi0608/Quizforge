import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/config/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Minimum 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: displayName || email.split("@")[0],
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!res.ok) {
        throw new Error(res.data?.msg || res.data?.message || "Signup failed");
      }

      toast({
        title: "Account created 🎉",
      });

      // Auto login if token returned directly
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.dispatchEvent(new Event("storage"));
        navigate("/");
        return;
      }

      // Otherwise do login call
      const loginRes = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!loginRes.ok) {
        throw new Error(loginRes.data?.msg || "Login failed");
      }

      if (loginRes.data?.token) {
        localStorage.setItem("token", loginRes.data.token);
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        navigate("/auth");
      }

    } catch (error: any) {
      console.error("Signup error:", error);

      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-4xl">🔥</span>
          <h1 className="text-3xl font-bold mt-4">Create Account</h1>
        </div>

        <form
          onSubmit={handleSignup}
          className="glass rounded-2xl p-8 space-y-5"
        >
          <input
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full p-3 rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have account?{" "}
          <span
            onClick={() => navigate("/auth")}
            className="text-primary cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
