import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Key, ArrowLeft, Shield, Sparkles, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const backendURL = "http://localhost:3000/api";
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return toast.error("Email required");

    setLoading(true);
    try {
      await axios.post(`${backendURL}/admin/forgot-password`, { email });
      toast.success("Verification code sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword)
      return toast.error("OTP and new password required");

    setLoading(true);
    try {
      await axios.post(`${backendURL}/admin/reset-password`, {
        email,
        otp,
        newPassword,
      });

      toast.success("Password reset successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setOtp("");
    setNewPassword("");
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
      <style jsx>{`
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
          <p className="text-[#9290C3] font-medium">
            {step === 1 ? "Password Recovery" : "Reset Password"}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Secure Recovery</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Step 1 — Send OTP */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                       style={{ background: "rgba(83, 92, 145, 0.2)" }}>
                    <Key className="w-8 h-8 text-[#9290C3]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Reset Your Password</h2>
                  <p className="text-sm text-gray-400">Enter your email to receive a verification code</p>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[#9290C3]" />
                    </div>
                    <input
                      type="email"
                      placeholder="admin@animehub.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-black/20 border border-[#535C91]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#535C91]/50 focus:border-[#535C91] transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={loading || !email}
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
                      Sending Code...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Send Verification Code</span>
                      <Sparkles className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="inline-flex items-center gap-2 text-sm text-[#9290C3] hover:text-white transition-colors duration-300 group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Reset Password */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                       style={{ background: "rgba(83, 92, 145, 0.2)" }}>
                    <Lock className="w-8 h-8 text-[#9290C3]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Set New Password</h2>
                  <p className="text-sm text-gray-400">Enter the verification code and your new password</p>
                </div>

                {/* Back Button */}
                <button
                  onClick={goBackToStep1}
                  className="flex items-center gap-2 text-sm text-[#9290C3] hover:text-white transition-colors duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Use different email
                </button>

                {/* OTP Input */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Verification Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-[#9290C3]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-black/20 border border-[#535C91]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#535C91]/50 focus:border-[#535C91] transition-all duration-300 text-center text-lg tracking-widest"
                      required
                    />
                  </div>
                  <p className="text-xs mt-2 text-gray-500">
                    Check your email ({email}) for the verification code
                  </p>
                </div>

                {/* New Password Input */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#9290C3]" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-black/20 border border-[#535C91]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#535C91]/50 focus:border-[#535C91] transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <Lock className="h-5 w-5 text-[#9290C3] hover:text-white transition-colors" />
                      ) : (
                        <Key className="h-5 w-5 text-[#9290C3] hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleResetPassword}
                  disabled={loading || !otp || !newPassword}
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
                      Updating Password...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Reset Password</span>
                      <Sparkles className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </button>
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
        <div className="mt-6 p-4 rounded-xl border border-[#535C91]/30 bg-black/20 backdrop-blur-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Shield className="w-4 h-4 text-[#9290C3]" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">
                All password recovery attempts are logged and monitored. Ensure you're using a secure connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}