import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AnimeCard from "../../components/AnimeCard.jsx";
import { Filter, Search, SortDesc, Sparkles, X, ChevronDown, Film } from "lucide-react";

const GENRE_OPTIONS = [
  "Action", "Adventure", "Fantasy", "Romance", "Comedy",
  "Drama", "Horror", "Sci-Fi", "Slice of Life", "Sports"
];

export default function Genre() {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");

  const backendURL = "http://localhost:3000/api/animes";

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const { data } = await axios.get(backendURL);
        setAnimes(data);
        setFilteredAnimes(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch animes");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  useEffect(() => {
    let temp = [...animes];

    if (selectedGenre !== "All") {
      temp = temp.filter(anime => anime.genres?.includes(selectedGenre));
    }

    if (search.trim()) {
      const lower = search.toLowerCase();
      temp = temp.filter(anime => anime.name.toLowerCase().includes(lower));
    }

    if (sortBy === "year") {
      temp.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
    } else if (sortBy === "rating") {
      temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredAnimes(temp);
  }, [selectedGenre, sortBy, search, animes]);

  const clearFilters = () => {
    setSelectedGenre("All");
    setSortBy("");
    setSearch("");
  };

  return (
    <div 
      className="min-h-screen"
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
      `}</style>

      {/* Floating Particles */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-2xl animate-float"
               style={{
                 background: "linear-gradient(45deg, #535C91, #1B1A55)",
                 boxShadow: "0 8px 32px rgba(27, 26, 85, 0.4)"
               }}>
            <Film className="w-10 h-10" style={{ color: '#9290C3' }} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Anime Library
          </h1>
          <p className="text-lg" style={{ color: '#9290C3' }}>
            Discover amazing anime from all genres
          </p>
        </div>

        {/* Filters Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl mb-8 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5" style={{ color: '#9290C3' }} />
              <h2 className="text-xl font-bold text-white">Filters & Search</h2>
            </div>
            
            {(selectedGenre !== "All" || sortBy || search) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
                style={{ color: '#9290C3' }}
              >
                <X className="w-4 h-4" style={{ color: '#9290C3' }} />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre Select */}
            <div className="relative group">
              <label className="block text-sm font-medium mb-2" style={{ color: '#9290C3' }}>
                Select Genre
              </label>
              <div className="relative">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/5 border border-#535C91/30 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 transition-all duration-300 appearance-none cursor-pointer"
                  style={{ color: '#9290C3' }}
                >
                  <option value="All" className="bg-#070F2B" style={{ color: '#9290C3' }}>All Genres</option>
                  {GENRE_OPTIONS.map((genre) => (
                    <option key={genre} value={genre} className="bg-#070F2B" style={{ color: '#9290C3' }}>{genre}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#9290C3' }} />
              </div>
            </div>

            {/* Sort Select */}
            <div className="relative group">
              <label className="block text-sm font-medium mb-2" style={{ color: '#9290C3' }}>
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/5 border border-#535C91/30 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 transition-all duration-300 appearance-none cursor-pointer"
                  style={{ color: '#9290C3' }}
                >
                  <option value="" className="bg-#070F2B" style={{ color: '#9290C3' }}>Default</option>
                  <option value="year" className="bg-#070F2B" style={{ color: '#9290C3' }}>Release Year</option>
                  <option value="rating" className="bg-#070F2B" style={{ color: '#9290C3' }}>Rating</option>
                </select>
                <SortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#9290C3' }} />
              </div>
            </div>

            {/* Search Input */}
            <div className="relative group">
              <label className="block text-sm font-medium mb-2" style={{ color: '#9290C3' }}>
                Search Anime
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5" style={{ color: '#9290C3' }} />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-#535C91/30 focus:outline-none focus:ring-2 focus:ring-#535C91/50 focus:border-#535C91 transition-all duration-300"
                  style={{ color: '#9290C3' }}
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedGenre !== "All" && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 border border-#535C91/30">
                <span className="text-sm" style={{ color: '#9290C3' }}>{selectedGenre}</span>
                <button
                  onClick={() => setSelectedGenre("All")}
                >
                  <X className="w-3 h-3" style={{ color: '#9290C3' }} />
                </button>
              </div>
            )}
            {sortBy && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 border border-#535C91/30">
                <span className="text-sm" style={{ color: '#9290C3' }}>
                  Sort: {sortBy === "year" ? "Release Year" : "Rating"}
                </span>
                <button
                  onClick={() => setSortBy("")}
                >
                  <X className="w-3 h-3" style={{ color: '#9290C3' }} />
                </button>
              </div>
            )}
            {search && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 border border-#535C91/30">
                <span className="text-sm" style={{ color: '#9290C3' }}>Search: {search}</span>
                <button
                  onClick={() => setSearch("")}
                >
                  <X className="w-3 h-3" style={{ color: '#9290C3' }} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {loading ? "Loading..." : `${filteredAnimes.length} Anime Found`}
            </h2>
            {!loading && filteredAnimes.length > 0 && (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: '#9290C3' }} />
                <span className="text-sm" style={{ color: '#9290C3' }}>Click on anime for details</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-#535C91/30 border-t-#9290C3 rounded-full animate-spin mx-auto mb-4"></div>
              <p style={{ color: '#9290C3' }}>Loading anime library...</p>
            </div>
          ) : filteredAnimes.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAnimes.map((anime) => (
                <div key={anime._id} className="transform transition-transform duration-300 hover:scale-[1.02]">
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 flex items-center justify-center mx-auto mb-4">
                <Film className="w-10 h-10" style={{ color: '#9290C3' }} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Anime Found</h3>
              <p className="mb-6" style={{ color: '#9290C3' }}>Try adjusting your filters or search</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(45deg, #535C91, #1B1A55)",
                  color: 'white'
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Genre Pills */}
        {!loading && filteredAnimes.length > 0 && (
          <div className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Browse by Genre</h3>
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: selectedGenre === genre 
                      ? "linear-gradient(45deg, #535C91, #1B1A55)"
                      : "rgba(146, 144, 195, 0.1)",
                    color: selectedGenre === genre ? 'white' : '#9290C3'
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}