import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, Star, Calendar, Film, Tag, Globe, CheckCircle, BookOpen } from "lucide-react";

export default function AnimeOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:3000/api/animes";

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/${id}`);
        setAnime(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch anime details");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
    }}>
      <style >{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div className="w-16 h-16 border-4 border-#535C91/30 border-t-#9290C3 rounded-full animate-spin"></div>
    </div>
  );

  if (!anime) return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
    }}>
      <style >{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div className="text-center backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Anime not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-lg text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(45deg, #535C91, #1B1A55)"
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen"
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors duration-300 group"
          style={{ color: '#9290C3' }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Browse</span>
        </button>

        {/* Main Content Card */}
        <div className="backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
             style={{ backgroundColor: 'rgba(146, 144, 195, 0.1)' }}>
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Image */}
            <div className="lg:w-2/5 relative">
              <div className="relative h-96 lg:h-full">
                <img
                  src={anime.image}
                  alt={anime.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-#070F2B via-transparent to-transparent opacity-40"></div>
                
                {/* Rating Badge */}
                {anime.rating && (
                  <div className="absolute top-4 right-4 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                       style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5" style={{ color: '#9290C3' }} />
                        <span className="text-2xl font-bold text-white">{anime.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-xs mt-1" style={{ color: '#9290C3' }}>Rating</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-3/5 p-8">
              {/* Title */}
              <div className="mb-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                  {anime.name}
                </h1>
                
                {anime.altNames && anime.altNames.length > 0 && (
                  <div className="flex items-center gap-2" style={{ color: '#9290C3' }}>
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Also known as: {anime.altNames.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" style={{ color: '#9290C3' }} />
                  Synopsis
                </h3>
                <p className="leading-relaxed text-lg" style={{ color: '#9290C3' }}>
                  {anime.description}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Genres */}
                {anime.genres && (
                  <div className="backdrop-blur-sm rounded-xl p-4 border border-white/10"
                       style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" style={{ color: '#9290C3' }} />
                      Genres
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {anime.genres.map((genre, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm rounded-full"
                          style={{
                            backgroundColor: 'rgba(83, 92, 145, 0.2)',
                            color: '#9290C3'
                          }}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {anime.tags && anime.tags.length > 0 && (
                  <div className="backdrop-blur-sm rounded-xl p-4 border border-white/10"
                       style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" style={{ color: '#9290C3' }} />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {anime.tags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm rounded-full border"
                          style={{
                            borderColor: '#9290C3',
                            color: '#9290C3'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Details Row - Lighter Purple Boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Release Year */}
                {anime.releaseYear && (
                  <div className="backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                       style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
                    <Calendar className="w-5 h-5 mx-auto mb-2" style={{ color: '#9290C3' }} />
                    <div className="text-white font-semibold">{anime.releaseYear}</div>
                    <div className="text-xs" style={{ color: '#9290C3' }}>Release Year</div>
                  </div>
                )}

                {/* Episodes */}
                {anime.episodes && (
                  <div className="backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                       style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
                    <Film className="w-5 h-5 mx-auto mb-2" style={{ color: '#9290C3' }} />
                    <div className="text-white font-semibold">{anime.episodes}</div>
                    <div className="text-xs" style={{ color: '#9290C3' }}>Episodes</div>
                  </div>
                )}

                {/* Status */}
                {anime.status && (
                  <div className="backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                       style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
                    <CheckCircle className="w-5 h-5 mx-auto mb-2" style={{ color: '#9290C3' }} />
                    <div className="text-white font-semibold">{anime.status}</div>
                    <div className="text-xs" style={{ color: '#9290C3' }}>Status</div>
                  </div>
                )}

                {/* Rating Box */}
                {anime.rating && (
                  <div className="backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                       style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
                    <Star className="w-5 h-5 mx-auto mb-2" style={{ color: '#9290C3' }} />
                    <div className="text-white font-semibold">{anime.rating.toFixed(1)}/5</div>
                    <div className="text-xs" style={{ color: '#9290C3' }}>Rating</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}