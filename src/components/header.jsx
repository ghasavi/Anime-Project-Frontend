import { Link, useNavigate } from "react-router-dom";
import { Home, Film, LayoutDashboard, LogOut, LogIn, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"; // adjust path if needed


export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleSignOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b border-[#9290C3]/20 shadow-sm">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              background: `radial-gradient(circle, #535C91, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationName: "float",
  animationDuration: `${Math.random() * 20 + 10}s`,
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#535C91] to-[#9290C3] rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative w-9 h-9 rounded-lg overflow-hidden shadow-md bg-white">
  <img
    src={logo}
    alt="AniRec Logo"
    className="w-full h-full object-contain"
  />
</div>

              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1B1A55] to-[#535C91] bg-clip-text text-transparent">
                  AniRec
                </h1>
                <p className="text-[10px] text-[#9290C3] tracking-wider">ANIME RECOMMENDATIONS</p>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1"
          >
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#070F2B] hover:text-[#1B1A55] hover:bg-[#9290C3]/10 transition-all duration-200 group"
            >
              <Home className="w-4 h-4 text-[#535C91] group-hover:text-[#1B1A55] transition-colors" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/genres"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#070F2B] hover:text-[#1B1A55] hover:bg-[#9290C3]/10 transition-all duration-200 group"
            >
              <Film className="w-4 h-4 text-[#535C91] group-hover:text-[#1B1A55] transition-colors" />
              <span className="font-medium">Genres</span>
            </Link>

            {/* Separator */}
            <div className="w-px h-6 bg-[#9290C3]/20 mx-2"></div>

            {token ? (
              <>
                <div className="relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-white"></div>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#535C91] to-[#1B1A55] hover:from-[#1B1A55] hover:to-[#535C91] transition-all duration-300 shadow-sm hover:shadow-md group"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">Admin</span>
                    <LayoutDashboard className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>

                <button
                  onClick={handleSignOut}
                  className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-[#535C91] hover:text-[#1B1A55] hover:bg-[#9290C3]/10 transition-all duration-200 group border border-[#9290C3]/30"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#535C91] to-[#1B1A55] hover:from-[#1B1A55] hover:to-[#535C91] transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Admin Login</span>
              </Link>
            )}
          </motion.nav>
        </div>
      </div>
    </header>
  );
}