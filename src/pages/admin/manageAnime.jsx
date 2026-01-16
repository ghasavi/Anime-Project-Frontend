import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Star,
  Loader2,
  ExternalLink,
  Sparkles,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  Clock as ClockIcon,
  BarChart3
} from "lucide-react";

export default function ManageAnime() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const backendURL = "http://localhost:3000/api/animes";

  const genres = [
    "all", "Action", "Adventure", "Comedy", "Drama", 
    "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life"
  ];

  const fetchAnimes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(backendURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnimes(data.animes || data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch anime list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this anime?")) return;
    
    setDeleteLoading(id);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${backendURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Anime deleted successfully!");
      fetchAnimes();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete anime");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Filter and search logic
  const filteredAnimes = animes.filter(anime => {
    const matchesSearch = anime.name?.toLowerCase().includes(search.toLowerCase()) ||
                         anime.description?.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "all" || 
                         anime.genres?.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAnimes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnimes = filteredAnimes.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'ongoing': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'upcoming': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRatingColor = (rating) => {
    const num = parseFloat(rating);
    if (num >= 8.5) return "text-green-400";
    if (num >= 7.0) return "text-yellow-400";
    if (num >= 5.0) return "text-orange-400";
    return "text-red-400";
  };

  // Calculate stats
  const stats = {
    total: animes.length,
    ongoing: animes.filter(a => a.status?.toLowerCase() === "ongoing").length,
    completed: animes.filter(a => a.status?.toLowerCase() === "completed").length,
    avgRating: (animes.reduce((acc, anime) => acc + (parseFloat(anime.rating) || 0), 0) / animes.length || 0).toFixed(1)
  };

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
        .table-row-hover:hover {
          background: linear-gradient(90deg, rgba(83, 92, 145, 0.1) 0%, rgba(27, 26, 85, 0.05) 100%);
        }
        .stat-card-glow {
          box-shadow: 0 8px 32px rgba(83, 92, 145, 0.15);
        }
      `}</style>

      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-#535C91 to-#1B1A55">
              <Sparkles className="w-6 h-6" />
            </div>
            Anime Management
          </h1>
          <p className="text-gray-400">
            Manage your anime collection with precision and style
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/add-anime")}
          className="group relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(45deg, #535C91, #1B1A55)",
            boxShadow: "0 4px 20px rgba(83, 92, 145, 0.3)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Anime
          </div>
        </button>
      </div>

      {/* Stats Cards - Moved to Top */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { 
            label: "Total Anime", 
            value: stats.total,
            color: "#9290C3",
            icon: <BarChart3 className="w-5 h-5" />,
            bgColor: "from-#9290C3/20 to-#9290C3/5"
          },
          { 
            label: "Ongoing", 
            value: stats.ongoing,
            color: "#10B981",
            icon: <TrendingUp className="w-5 h-5" />,
            bgColor: "from-green-500/20 to-green-500/5"
          },
          { 
            label: "Completed", 
            value: stats.completed,
            color: "#3B82F6",
            icon: <CheckCircle className="w-5 h-5" />,
            bgColor: "from-blue-500/20 to-blue-500/5"
          },
          { 
            label: "Avg Rating", 
            value: stats.avgRating,
            color: "#F59E0B",
            icon: <Star className="w-5 h-5" />,
            bgColor: "from-yellow-500/20 to-yellow-500/5"
          }
        ].map((stat, idx) => (
          <div 
            key={idx}
            className={`backdrop-blur-xl rounded-xl border border-white/10 p-4 stat-card-glow transition-all duration-300 hover:scale-[1.02] ${stat.bgColor}`}
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
                  width: `${(stat.value / Math.max(...Object.values(stats).filter(v => typeof v === 'number'))) * 100}%`,
                  background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Side: Search */}
          <div className="flex-1">
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-#9290C3" />
              </div>
              <input
                type="text"
                placeholder="Search anime by name, description, or genre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Side: Filters and Info */}
          <div className="flex items-center gap-4">
            {/* Genre Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-#9290C3" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-2.5 bg-black/20 border border-#535C91/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 transition-all duration-300 min-w-[150px]"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-#1B1A55">
                    {genre === "all" ? "All Genres" : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="hidden md:block">
              <div className="px-4 py-2 rounded-xl bg-black/20 border border-white/10">
                <span className="text-sm text-gray-400">Showing </span>
                <span className="text-white font-semibold">
                  {paginatedAnimes.length}
                </span>
                <span className="text-sm text-gray-400"> of </span>
                <span className="text-white font-semibold">
                  {filteredAnimes.length}
                </span>
                <span className="text-sm text-gray-400"> anime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anime Table */}
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-#535C91/30 border-t-#535C91 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading anime database...</p>
          </div>
        ) : paginatedAnimes.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Anime Found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {search || selectedGenre !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Your anime collection is empty. Start by adding your first anime!"}
            </p>
            {search || selectedGenre !== "all" ? (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedGenre("all");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(45deg, #535C91, #1B1A55)"
                }}
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={() => navigate("/admin/add-anime")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(45deg, #535C91, #1B1A55)"
                }}
              >
                <Plus className="w-5 h-5" />
                Add First Anime
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Anime</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Genres</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Status</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Rating</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Episodes</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedAnimes.map((anime) => (
                    <tr 
                      key={anime._id}
                      className="table-row-hover transition-all duration-300"
                    >
                      {/* Anime Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            {anime.image ? (
                              <img
                                src={anime.image}
                                alt={anime.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-#535C91/30 to-#1B1A55/30 flex items-center justify-center">
                                <span className="text-white/50 text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-white truncate">{anime.name}</h3>
                            
                          </div>
                        </div>
                      </td>

                      {/* Genres */}
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {anime.genres?.slice(0, 3).map((genre, idx) => (
                            <span 
                              key={idx}
                              className="px-2.5 py-1 text-xs rounded-full bg-#535C91/30 text-#9290C3 border border-#535C91/50"
                            >
                              {genre}
                            </span>
                          ))}
                          {anime.genres?.length > 3 && (
                            <span className="px-2.5 py-1 text-xs rounded-full bg-gray-500/30 text-gray-400">
                              +{anime.genres.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(anime.status)}`}>
                          {anime.status || "Unknown"}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Star className={`w-4 h-4 ${getRatingColor(anime.rating)} fill-current`} />
                          <span className={`font-bold ${getRatingColor(anime.rating)}`}>
                            {anime.rating || "N/A"}
                          </span>
                          {anime.rating && <span className="text-gray-500 text-sm">/10</span>}
                        </div>
                      </td>

                      {/* Episodes */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-white font-medium">{anime.episodes || "N/A"}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/edit-anime/${anime._id}`)}
                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors duration-300 group relative"
                            title="Edit"
                          >
                            <div className="absolute -inset-1 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Edit className="w-4 h-4 relative z-10" />
                          </button>
                          <button
                            onClick={() => handleDelete(anime._id)}
                            disabled={deleteLoading === anime._id}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-300 group relative disabled:opacity-50"
                            title="Delete"
                          >
                            <div className="absolute -inset-1 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {deleteLoading === anime._id ? (
                              <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                            ) : (
                              <Trash2 className="w-4 h-4 relative z-10" />
                            )}
                          </button>
                          <button
                            onClick={() => window.open(anime.url, '_blank')}
                            disabled={!anime.url}
                            className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors duration-300 group relative disabled:opacity-30"
                            title="View Details"
                          >
                            <div className="absolute -inset-1 bg-green-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <ExternalLink className="w-4 h-4 relative z-10" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                  Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
                  <span className="text-white font-semibold">{totalPages}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-300 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-#535C91 to-#1B1A55 text-white"
                              : "bg-black/20 text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-300 disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Security Note */}
      <div className="mt-6 p-4 rounded-xl border border-#535C91/30 bg-black/20 backdrop-blur-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <AlertTriangle className="w-4 h-4" style={{ color: '#9290C3' }} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-400">
              All actions are logged. Ensure you have proper authorization before making changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}