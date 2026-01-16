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
  Bell,
  Home,
  Sparkles,
  Search,
  Menu,
  X,
  Activity,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Calendar,
  Database,
  Zap
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalAnime: 0,
    totalAdmins: 0,
    activeSessions: 0,
    todayViews: 0,
    recentActivity: []
  });

  // Admin authentication check
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch admin data
        const adminRes = await api.get("/admin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (adminRes.status === 200) {
          setIsAdmin(true);
          setAdminData(adminRes.data.admin || {});
         
          console.log("Admin API response:", adminRes.data.admin);

          // Fetch dashboard stats
          try {
            const statsRes = await api.get("/admin/dashboard-stats", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (statsRes.data) {
              setDashboardStats({
                totalAnime: statsRes.data.totalAnime || 0,
                totalAdmins: statsRes.data.totalAdmins || 0,
                activeSessions: statsRes.data.activeSessions || 0,
                todayViews: statsRes.data.todayViews || 0,
                recentActivity: statsRes.data.recentActivity || []
              });
            }
          } catch (statsErr) {
            console.log("Could not fetch stats, using default values");
          }

          
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth error:", err);
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    },
    {
      path: "/admin/manage-admins",
      label: "Manage Admins",
      icon: <Users className="w-5 h-5" />,
    },
    
  ];

  const getPageTitle = () => {
    if (location.pathname === '/admin') return 'Dashboard';
    if (location.pathname.includes('manage-anime')) return '';
    if (location.pathname.includes('manage-admins')) return '';
    if (location.pathname.includes('add-anime')) return 'Add New Anime';
    if (location.pathname.includes('edit-anime')) return 'Edit Anime';
     return 'Dashboard';
  };

  const getPageDescription = () => {
  if (location.pathname === '/admin') return 'System Overview & Statistics';
  if (location.pathname.includes('manage-anime')) return 'Manage anime collection and content';
  if (location.pathname.includes('manage-admins')) return 'Administrator account management';
  if (location.pathname.includes('add-anime')) return 'Add new anime to collection';
  if (location.pathname.includes('edit-anime')) return 'Edit anime details';
  return 'Anime Recommendation System';
};


  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
        }}
      >
        <style>{`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#535C91]/30 border-t-[#535C91] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9290C3]">Loading Dashboard...</p>
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
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .sidebar-link-active {
          background: linear-gradient(90deg, #535C91 0%, #1B1A55 100%);
          box-shadow: 0 4px 20px rgba(83, 92, 145, 0.3);
        }
      `}</style>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-xl bg-[#1B1A55]/80 backdrop-blur-sm border border-[#535C91]/30 text-[#9290C3] hover:text-white hover:bg-[#1B1A55] transition-all duration-300"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } fixed lg:static z-40 h-screen w-64 transition-transform duration-300 ease-in-out`}>
        <div className="h-full backdrop-blur-xl bg-white/5 border-r border-white/10 p-5 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 pt-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#535C91] to-[#1B1A55] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AniRec Admin</h2>
              <p className="text-xs text-[#9290C3]">Management Panel</p>
            </div>
          </div>

          {/* Admin Info */}
          <div className="p-4 rounded-xl mb-6 border border-[#535C91]/30 bg-black/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#535C91] to-[#1B1A55] flex items-center justify-center">
                  <span className="text-white font-bold">
                    {adminData.name?.[0]?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#070F2B] animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm truncate">{adminData.name || 'Administrator'}</h3>
                <p className="text-xs text-[#9290C3] truncate">{adminData.email || 'admin@animehub.com'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
              <span className="text-xs text-[#9290C3]">Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'sidebar-link-active text-white' 
                      : 'text-[#9290C3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`${isActive ? 'text-white' : 'text-[#9290C3]'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-6 p-4 rounded-xl border border-[#535C91]/30 bg-black/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#9290C3]" />
              <span className="text-sm font-medium text-white">Quick Actions</span>
            </div>
            <div className="space-y-2">
              <Link
                to="/admin/add-anime"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 text-sm text-[#9290C3] hover:text-white hover:bg-[#535C91]/20 rounded-lg transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Anime</span>
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center gap-2 p-3 rounded-xl border border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>

          {/* Back to Home */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 p-3 rounded-xl text-sm text-[#9290C3] hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>

          {/* Version */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-xs text-center text-[#9290C3]/50">
              v2.1 • Admin Panel
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{getPageTitle()}</h1>
              <p className="text-[#9290C3]">{getPageDescription()}</p>
            </div>
            
            <div className="flex items-center gap-3">
             

              
            </div>
          </div>

          {/* Dashboard Stats */}
          {location.pathname === '/admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  label: "Total Anime", 
                  value: dashboardStats.totalAnime.toLocaleString(),
                  icon: <Film className="w-5 h-5" />,
                  color: "border-purple-500/30",
                  bgColor: "bg-purple-500/20"
                },
                { 
                  label: "Total Admins", 
                  value: dashboardStats.totalAdmins,
                  icon: <Users className="w-5 h-5" />,
                  color: "border-blue-500/30",
                  bgColor: "bg-blue-500/20"
                },
                { 
                  label: "Active Sessions", 
                  value: dashboardStats.activeSessions,
                  icon: <Activity className="w-5 h-5" />,
                  color: "border-green-500/30",
                  bgColor: "bg-green-500/20"
                },
                
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl backdrop-blur-sm border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.color} border`}>
                      <div className={`${
                        stat.label.includes('Anime') ? 'text-purple-400' :
                        stat.label.includes('Admins') ? 'text-blue-400' :
                        stat.label.includes('Sessions') ? 'text-green-400' : 'text-orange-400'
                      }`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[#9290C3]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden min-h-[500px]">
          <Routes>
            {/* Dashboard home */}
            <Route 
              path="" 
              element={
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Recent Activity */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-[#535C91]/20">
                          <Activity className="w-5 h-5 text-[#9290C3]" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                      </div>
                      
                      {dashboardStats.recentActivity && dashboardStats.recentActivity.length > 0 ? (
                        <div className="space-y-3">
                          {dashboardStats.recentActivity.map((activity, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-white/10 bg-black/20 hover:border-[#535C91]/30 transition-all duration-300">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-white">{activity.action}</span>
                                <span className="text-xs text-[#9290C3]">{activity.time}</span>
                              </div>
                              <p className="text-sm text-[#9290C3]">{activity.details}</p>
                              {activity.user && (
                                <div className="flex items-center gap-2 mt-3">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#535C91] to-[#1B1A55] flex items-center justify-center">
                                    <span className="text-xs text-white">{activity.user.charAt(0)}</span>
                                  </div>
                                  <span className="text-sm text-[#9290C3]">{activity.user}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center rounded-xl border border-white/10 bg-black/20">
                          <Database className="w-12 h-12 text-[#9290C3]/50 mx-auto mb-4" />
                          <p className="text-[#9290C3]">No recent activity to display</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Quick Stats */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-[#535C91]/20">
                          <BarChart3 className="w-5 h-5 text-[#9290C3]" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Quick Stats</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                          <div className="text-sm text-[#9290C3] mb-2">System Status</div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm text-green-400">All Systems Operational</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                          <div className="text-sm text-[#9290C3] mb-2">Current Session</div>
                          <div className="flex items-center justify-between">
                            <div className="text-white font-medium">
                              {adminData.name || 'Admin'}
                            </div>
                            <div className="text-xs text-[#9290C3]">
                              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                          <div className="text-sm text-[#9290C3] mb-2">Database Status</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-sm text-white">Connected</span>
                            </div>
                            <Calendar className="w-4 h-4 text-[#9290C3]" />
                          </div>
                        </div>

                        <Link
                          to="/admin/manage-anime"
                          className="block p-4 rounded-xl border border-[#535C91]/30 bg-[#535C91]/10 hover:bg-[#535C91]/20 hover:border-[#535C91]/50 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white">Manage Anime</span>
                            <Sparkles className="w-4 h-4 text-[#9290C3] group-hover:text-white transition-colors" />
                          </div>
                          <p className="text-sm text-[#9290C3]">Browse and edit your anime collection</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
            {/* Manage Anime table */}
            <Route path="manage-anime" element={<ManageAnime />} />
            {/* Add Anime form */}
            <Route path="add-anime" element={<AddAnime />} />
            {/* Edit Anime form */}
            <Route path="edit-anime/:id" element={<EditAnime />} />
            {/* Manage Admins */}
            <Route path="manage-admins" element={<ManageAdmins />} />
               
            {/* Catch-all */}
            <Route path="*" element={
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#535C91]/20 to-[#1B1A55]/20 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
                <p className="text-[#9290C3] mb-6">The requested page does not exist.</p>
                <button
                  onClick={() => navigate('/admin')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:opacity-90"
                  style={{
                    background: "linear-gradient(45deg, #535C91, #1B1A55)"
                  }}
                >
                  Return to Dashboard
                </button>
              </div>
            } />
          </Routes>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-[#9290C3]/50">
                © {new Date().getFullYear()} AnimeHub Admin Panel • v2.1
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-green-400">System: Operational</span>
              </div>
              <span className="text-xs text-[#9290C3] hidden md:inline">•</span>
              <span className="text-xs text-[#9290C3]">Session: {adminData.name || 'Admin'}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}