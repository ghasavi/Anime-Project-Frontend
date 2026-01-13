import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const backendURL = "http://localhost:3000/api"; // adjust if needed
  const navigate = useNavigate();

  // ================= EMAIL/PASSWORD LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendURL}/admin/login`, {
        email,
        password,
      });
      localStorage.setItem("adminToken", data.token);
      toast.success("Login successful!");
      window.location.href = "/admin";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    if (!email) return toast.error("Enter your email first");
    try {
      await axios.post(`${backendURL}/admin/send-otp`, { email });
      toast.success("OTP sent to email");
      setShowOtp(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async () => {
    if (!otp || !newPassword) return toast.error("Enter OTP and new password");
    try {
      await axios.post(`${backendURL}/admin/reset-password`, {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful! Login now.");
      setShowOtp(false);
      setOtp("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

      {!showOtp && (
        <>
          {/* EMAIL/PASSWORD FORM */}
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* GOOGLE LOGIN */}
          <div className="mt-3">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const { credential } = credentialResponse;

                try {
                  // send credential directly to backend
                  const { data } = await axios.post(
                    `${backendURL}/admin/google-login`,
                    { accessToken: credential }
                  );
                  localStorage.setItem("adminToken", data.token);
                  toast.success("Google login success!");
                  window.location.href = "/admin";
                } catch (err) {
                  toast.error(err.response?.data?.message || "Google login failed");
                }
              }}
              onError={() => toast.error("Google login failed")}
            />
          </div>

          <button
  type="button"
  className="text-sm underline mt-3"
  onClick={() => navigate("/admin/forgot-password")}
>
  Forgot Password?
</button>

        </>
      )}

      {showOtp && (
        <div className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleResetPassword}
            className="bg-green-600 text-white p-2 rounded"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}
