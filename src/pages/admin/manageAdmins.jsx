import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Users,
  Shield,
  Activity,
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  UserCheck,
  MoreVertical,
  Zap,
  Globe
} from "lucide-react";

export default function AdminActivity() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const backendURL = import.meta.env.VITE_BACKEND_URL + "/api/admin/active";

  const fetchAdmins = async (showToast = false) => {
    if (!refreshing) setRefreshing(true);
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(backendURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(data.admins || []);
      setLastUpdate(new Date());
      if (showToast) {
        toast.success("Admin activity refreshed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch admin activity");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
    const interval = setInterval(() => fetchAdmins(), 15000); // auto refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const getStatusDetails = (lastActive) => {
    if (!lastActive) return { isOnline: false, text: "Never Active", color: "text-gray-500" };
    
    const timeDiff = Date.now() - new Date(lastActive).getTime();
    const isOnline = timeDiff < 60000; // 1 minute
    const minutesAgo = Math.floor(timeDiff / 60000);
    
    let statusText, statusColor;
    if (isOnline) {
      statusText = "Online Now";
      statusColor = "text-green-400";
    } else if (minutesAgo < 60) {
      statusText = `${minutesAgo}m ago`;
      statusColor = "text-yellow-400";
    } else if (minutesAgo < 1440) {
      statusText = `${Math.floor(minutesAgo / 60)}h ago`;
      statusColor = "text-orange-400";
    } else {
      statusText = `${Math.floor(minutesAgo / 1440)}d ago`;
      statusColor = "text-red-400";
    }
    
    return { isOnline, text: statusText, color: statusColor };
  };

  const getAdminLevel = (email) => {
    if (email.includes('super') || email.includes('admin')) return 'Super Admin';
    if (email.includes('mod') || email.includes('editor')) return 'Moderator';
    return 'Admin';
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Super Admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  const onlineCount = admins.filter(admin => {
    const status = getStatusDetails(admin.lastActive);
    return status.isOnline;
  }).length;

  return (
    <div 
      className="min-h-screen p-6"
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
        .online-glow {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        .table-row-hover:hover {
          background: linear-gradient(90deg, rgba(83, 92, 145, 0.1) 0%, rgba(27, 26, 85, 0.05) 100%);
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-#535C91 to-#1B1A55">
              <Activity className="w-6 h-6" />
            </div>
            Admin Activity Monitor
          </h1>
          <p className="text-gray-400">
            Real-time monitoring of all administrator sessions and activities
          </p>
        </div>
        <button
          onClick={() => fetchAdmins(true)}
          disabled={refreshing}
          className="group relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
          style={{
            background: "linear-gradient(45deg, #535C91, #1B1A55)",
            boxShadow: "0 4px 20px rgba(83, 92, 145, 0.3)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="flex items-center gap-2">
            {refreshing ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            Refresh Data
          </div>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { 
            label: "Total Admins", 
            value: admins.length,
            color: "#9290C3",
            icon: <Users className="w-5 h-5" />,
            bgColor: "from-#9290C3/20 to-#9290C3/5"
          },
          { 
            label: "Online Now", 
            value: onlineCount,
            color: "#10B981",
            icon: <Wifi className="w-5 h-5" />,
            bgColor: "from-green-500/20 to-green-500/5"
          },
          { 
            label: "Offline", 
            value: admins.length - onlineCount,
            color: "#6B7280",
            icon: <WifiOff className="w-5 h-5" />,
            bgColor: "from-gray-500/20 to-gray-500/5"
          },
          { 
            label: "Last Updated", 
            value: lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            color: "#3B82F6",
            icon: <Clock className="w-5 h-5" />,
            bgColor: "from-blue-500/20 to-blue-500/5"
          }
        ].map((stat, idx) => (
          <div 
            key={idx}
            className={`backdrop-blur-xl rounded-xl border border-white/10 p-4 transition-all duration-300 hover:scale-[1.02] ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl`} style={{ 
                background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}05)`,
                border: `1px solid ${stat.color}30`
              }}>
                <div style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-300">{stat.label}</p>
            <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700"
                style={{ 
                  width: stat.label === "Last Updated" ? '100%' : `${(stat.value / Math.max(admins.length, 1)) * 100}%`,
                  background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Activity Table */}
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Active Admin Sessions</h2>
                <p className="text-sm text-gray-400">Real-time monitoring dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-gray-400">Online</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span className="text-xs text-gray-400">Offline</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Auto-refresh: <span className="text-green-400 font-medium">15s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-#535C91/30 border-t-#535C91 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading admin sessions...</p>
          </div>
        ) : admins.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Admin Data</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              No administrator accounts found in the system
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Admin</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Role</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Status</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Last Active</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {admins.map((admin, idx) => {
                    const status = getStatusDetails(admin.lastActive);
                    const level = getAdminLevel(admin.email);
                    
                    return (
                      <tr 
                        key={admin._id}
                        className={`table-row-hover transition-all duration-300 ${status.isOnline ? 'online-glow' : ''}`}
                      >
                        {/* Admin Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-#535C91/30 to-#1B1A55/30 flex items-center justify-center">
                                {admin.img ? (
                                  <img
                                    src={admin.img}
                                    alt={admin.name || admin.email}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-#535C91/40 to-#1B1A55/40">
                                    <span className="text-white text-lg font-bold">
                                      {(admin.name || admin.email).charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {status.isOnline && (
                                <div className="absolute -bottom-1 -right-1">
                                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-#070F2B animate-pulse"></div>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-white">
                                {admin.name || admin.email.split('@')[0]}
                              </h3>
                              <p className="text-sm text-gray-400 truncate max-w-[200px]">
                                {admin.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(level)}`}>
                            <Shield className="w-3 h-3 mr-1" />
                            {level}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${status.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                            <div>
                              <span className={`font-medium ${status.color}`}>
                                {status.text}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {status.isOnline ? 'Active session' : 'Session ended'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Last Active */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="text-white font-medium">
                                {admin.lastActive ? new Date(admin.lastActive).toLocaleDateString() : '—'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {admin.lastActive ? new Date(admin.lastActive).toLocaleTimeString() : 'No activity'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                // View admin details
                                toast.success(`Viewing ${admin.name || admin.email} details`);
                              }}
                              className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors duration-300 group relative"
                              title="View Details"
                            >
                              <div className="absolute -inset-1 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <UserCheck className="w-4 h-4 relative z-10" />
                            </button>
                            <button
                              onClick={() => {
                                // Send notification
                                toast.success(`Notification sent to ${admin.email}`);
                              }}
                              className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors duration-300 group relative"
                              title="Send Alert"
                            >
                              <div className="absolute -inset-1 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <Zap className="w-4 h-4 relative z-10" />
                            </button>
                            <button
                              className="p-2 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-colors duration-300"
                              title="More Options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Info */}
            <div className="px-6 py-4 border-t border-white/10 bg-black/10">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  <span className="text-gray-400">Total Admins: </span>
                  <span className="text-white font-medium">{admins.length}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-400">Online: </span>
                  <span className="text-green-400 font-medium">{onlineCount}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-400">Offline: </span>
                  <span className="text-gray-400 font-medium">{admins.length - onlineCount}</span>
                </div>
                <div className="text-right">
                  <div>Last Updated: {lastUpdate.toLocaleTimeString()}</div>
                  <div className="text-xs">Next auto-refresh in 15 seconds</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Monitoring Note */}
      <div className="mt-6 p-4 rounded-xl border border-#535C91/30 bg-black/20 backdrop-blur-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Activity className="w-4 h-4" style={{ color: '#9290C3' }} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-400">
              All admin activities are monitored and logged. Real-time updates every 15 seconds. 
              Unusual activities are automatically flagged for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}