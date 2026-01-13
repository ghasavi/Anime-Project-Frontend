import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = reset
  const [loading, setLoading] = useState(false);

  const backendURL = "http://localhost:3000/api";

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    if (!email) return toast.error("Email required");

    setLoading(true);
    try {
      await axios.post(`${backendURL}/admin/forgot-password`, { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET PASSWORD =================
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

      toast.success("Password reset successful 🎉");
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {step === 1 ? "Forgot Password" : "Reset Password"}
      </h2>

      {/* STEP 1 — SEND OTP */}
      {step === 1 && (
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      )}

      {/* STEP 2 — RESET PASSWORD */}
      {step === 2 && (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="bg-green-600 text-white p-2 rounded"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
}
