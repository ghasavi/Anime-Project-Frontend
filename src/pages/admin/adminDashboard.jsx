import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ManageAnime from "./manageAnime";
import AddAnime from "./addAnime";
import ManageAdmins from "./manageAdmins";
import EditAnime from "./editAnime";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  LogOut, 
  Shield, 
  Settings, 
  BarChart3,
  Bell,
  Home,
  Sparkles,
  ChevronRight,
  Search,
  Menu,
  X
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin authentication check
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        if (res.status === 200) {
          setIsAdmin(true);
          setAdminData(res.data.admin || {});
        } else {
          navigate("/login");
        }
      } catch (err) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      exact: true
    },
    {
      path: "/admin/manage-anime",
      label: "Manage Anime",
      icon: <Film className="w-5 h-5" />,
      badge: "12"
    },
    {
      path: "/admin/manage-admins",
      label: "Manage Admins",
      icon: <Users className="w-5 h-5" />
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />
    },
    {
      path: "/admin/analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{
             background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
           }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#535C91] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9290C3]">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div 
      className="min-h-screen flex"
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

      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
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

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-[#1B1A55]/50 backdrop-blur-sm border border-[#535C91]/30 text-[#9290C3]"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } fixed lg:static z-40 h-screen w-64 lg:w-72 transition-transform duration-300 ease-in-out`}>
        <div className="h-full backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 pt-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#535C91] to-[#1B1A55] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin Portal</h2>
              <p className="text-xs text-[#9290C3]">Anime Recommendation</p>
            </div>
          </div>

          {/* Admin Info */}
          <div className="p-4 rounded-xl mb-8"
               style={{
                 background: "linear-gradient(45deg, rgba(83, 92, 145, 0.2), rgba(27, 26, 85, 0.2))",
                 border: "1px solid rgba(83, 92, 145, 0.3)"
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#535C91] to-[#1B1A55] flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {adminData.name?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{adminData.name || 'Admin'}</h3>
                <p className="text-xs text-[#9290C3]">{adminData.email || 'admin@animehub.com'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#535C91] to-[#1B1A55] text-white' 
                      : 'text-[#9290C3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${isActive ? 'text-white' : 'text-[#9290C3] group-hover:text-white'}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                    }`} />
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 p-4 rounded-xl border border-[#535C91]/30 bg-black/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">Quick Actions</span>
              <Sparkles className="w-4 h-4 text-[#9290C3]" />
            </div>
            <Link
              to="/admin/add-anime"
              className="flex items-center gap-2 p-2 text-sm text-[#9290C3] hover:text-white transition-colors"
            >
              <div className="w-6 h-6 rounded bg-[#535C91]/30 flex items-center justify-center">
                <span className="text-xs">+</span>
              </div>
              Add New Anime
            </Link>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 group flex items-center justify-center gap-2 p-3 rounded-xl border border-[#535C91]/30 text-[#9290C3] hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>

          {/* Back to Home */}
          <Link
            to="/"
            className="mt-4 flex items-center justify-center gap-2 p-3 rounded-xl text-sm text-[#9290C3] hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {location.pathname === '/admin' && 'Dashboard'}
                {location.pathname.includes('manage-anime') && 'Manage Anime'}
                {location.pathname.includes('manage-admins') && 'Manage Admins'}
                {location.pathname.includes('add-anime') && 'Add New Anime'}
                {location.pathname.includes('edit-anime') && 'Edit Anime'}
                {location.pathname.includes('settings') && 'Settings'}
                {location.pathname.includes('analytics') && 'Analytics'}
              </h1>
              <p className="text-[#9290C3]">
                Manage your anime recommendation system efficiently
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 lg:flex-none">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#9290C3]" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full lg:w-64 pl-10 pr-4 py-2 bg-white/5 border border-[#535C91]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#535C91]/50 focus:border-[#535C91] backdrop-blur-sm"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-xl bg-white/5 border border-[#535C91]/30 text-[#9290C3] hover:text-white hover:bg-white/10 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* View Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 rounded-xl bg-white/5 border border-[#535C91]/30 text-[#9290C3] hover:text-white hover:bg-white/10 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {location.pathname === '/admin' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { label: "Total Anime", value: "1,245", change: "+12%", icon: <Film className="w-6 h-6" /> },
                { label: "Active Users", value: "10,458", change: "+8%", icon: <Users className="w-6 h-6" /> },
                { label: "Recommendations", value: "45,789", change: "+23%", icon: <Sparkles className="w-6 h-6" /> },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 hover:border-[#535C91]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#535C91]/30 to-[#1B1A55]/30">
                      <div className="text-[#9290C3]">{stat.icon}</div>
                    </div>
                    <span className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[#9290C3]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
          <Routes>
            {/* Dashboard home */}
            <Route 
              path="" 
              element={
                <div className="p-8 text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                       style={{
                         background: "linear-gradient(45deg, #535C91, #1B1A55)",
                       }}>
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Welcome to Admin Dashboard</h2>
                  <p className="text-[#9290C3] max-w-2xl mx-auto">
                    Manage your anime recommendation system, track analytics, and oversee content 
                    from this centralized dashboard. Everything you need to run the platform is here.
                  </p>
                </div>
              } 
            />
            {/* Manage Anime table */}
            <Route path="manage-anime" element={<ManageAnime />} />
            {/* Add Anime form */}
            <Route path="add-anime" element={<AddAnime />} />
            <Route path="manage-admins" element={<ManageAdmins />} />
            <Route path="edit-anime/:id" element={<EditAnime />} />
            {/* Catch-all */}
            <Route path="*" element={<div className="text-center p-8 text-[#9290C3]">Page not found</div>} />
          </Routes>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#9290C3]/50">
            © {new Date().getFullYear()} AnimeHub Admin Portal • Secure Dashboard v2.1
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-green-400">System Status: Operational</span>
          </div>
        </div>
      </main>
    </div>
  );
}