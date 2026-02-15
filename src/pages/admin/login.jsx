import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Key, Shield, Sparkles, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendURL}/admin/login`, {
        email,
        password,
      });
      localStorage.setItem("adminToken", data.token);
      toast.success("Access granted!");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      await axios.post(`${backendURL}/admin/send-otp`, { email });
      toast.success("Verification code sent");
      setShowOtp(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send code");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) return toast.error("Please complete all fields");
    try {
      await axios.post(`${backendURL}/admin/reset-password`, {
        email,
        otp,
        newPassword,
      });
      toast.success("Password updated successfully");
      setShowOtp(false);
      setOtp("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      <style >{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              background: `radial-gradient(circle, #9290C3, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-float">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-2xl"
               style={{
                 background: "linear-gradient(45deg, #535C91, #1B1A55)",
                 boxShadow: "0 8px 32px rgba(27, 26, 85, 0.4)"
               }}>
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-#9290C3 font-medium">
            Anime Recommendation System
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Secure Connection</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8">
            {!showOtp ? (
              <>
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-#9290C3" />
                      </div>
                      <input
                        type="email"
                        placeholder="admin@animehub.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-#9290C3" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-#9290C3 hover:text-white transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-#9290C3 hover:text-white transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative overflow-hidden rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(45deg, #535C91, #1B1A55)",
                      boxShadow: "0 4px 20px rgba(83, 92, 145, 0.3)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Authenticating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <LogIn className="w-5 h-5 mr-2" />
                        Access Dashboard
                      </div>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-transparent text-gray-400">or continue with</span>
                    </div>
                  </div>
                </div>

                {/* Google Login */}
                <div className="flex justify-center">
                  <div className="hover:scale-105 transition-transform duration-300">
                    <GoogleLogin
                      onSuccess={async (credentialResponse) => {
                        const { credential } = credentialResponse;
                        try {
                          const { data } = await axios.post(
                            `${backendURL}/admin/google-login`,
                            { accessToken: credential }
                          );
                          localStorage.setItem("adminToken", data.token);
                          toast.success("Welcome!");
                          setTimeout(() => {
                            window.location.href = "/admin";
                          }, 800);
                        } catch (err) {
                          toast.error(err.response?.data?.message || "Authentication failed");
                        }
                      }}
                      onError={() => toast.error("Google authentication failed")}
                      theme="filled_black"
                      size="large"
                      shape="rectangular"
                      width="250"
                    />
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/forgot-password")}
                    className="inline-flex items-center gap-2 text-sm text-#9290C3 hover:text-white transition-colors duration-300 group"
                  >
                    <Key className="w-4 h-4" />
                    Forgot your password?
                    <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </>
            ) : (
              /* Reset Password Form */
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                       style={{ background: "rgba(83, 92, 145, 0.2)" }}>
                    <Key className="w-6 h-6" style={{ color: '#9290C3' }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Reset Password</h3>
                  <p className="text-sm text-gray-400">Enter the verification code sent to your email</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 text-center text-lg tracking-widest"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOtp(false)}
                    className="flex-1 py-3 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{
                      background: "linear-gradient(45deg, #535C91, #1B1A55)"
                    }}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-white/10 bg-black/10">
            <p className="text-center text-xs text-gray-500">
              © {new Date().getFullYear()} AnimeHub • Secure Admin Portal v2.1
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 rounded-xl border border-#535C91/30 bg-black/20 backdrop-blur-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Shield className="w-4 h-4" style={{ color: '#9290C3' }} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">
                All access is logged and monitored. Ensure you're using a secure connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}