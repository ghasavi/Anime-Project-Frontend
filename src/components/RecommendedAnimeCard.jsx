import { Star, Film, Calendar, CheckCircle } from "lucide-react";

export default function RecommendedAnimeCard({ anime }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:border-#535C91/50">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="md:w-48">
          <div className="relative">
            <img
              src={anime.image}
              alt={anime.name}
              className="w-full h-64 object-cover rounded-xl"
            />
            {/* Rating Overlay */}
            {anime.rating !== undefined && (
              <div className="absolute top-3 right-3 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20"
                   style={{ backgroundColor: 'rgba(146, 144, 195, 0.2)' }}>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" style={{ color: '#9290C3' }} />
                  <span className="text-sm font-bold text-white">{anime.rating.toFixed(1)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-4">{anime.name}</h2>

          {/* Description Preview */}
          {anime.description && (
            <p className="mb-5 leading-relaxed" style={{ color: '#9290C3' }}>
              {anime.description.length > 150 
                ? `${anime.description.substring(0, 150)}...` 
                : anime.description}
            </p>
          )}

          {/* Details Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Genres */}
            {anime.genres?.length > 0 && (
              <div>
                <div className="text-xs mb-2" style={{ color: '#9290C3' }}>Genres</div>
                <div className="flex flex-wrap gap-1">
                  {anime.genres.slice(0, 2).map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full"
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

            {/* Episodes */}
            {anime.episodes !== undefined && (
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4" style={{ color: '#9290C3' }} />
                <div>
                  <div className="text-xs" style={{ color: '#9290C3' }}>Episodes</div>
                  <div className="text-white font-medium">{anime.episodes}</div>
                </div>
              </div>
            )}

            {/* Release Year */}
            {anime.releaseYear && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: '#9290C3' }} />
                <div>
                  <div className="text-xs" style={{ color: '#9290C3' }}>Year</div>
                  <div className="text-white font-medium">{anime.releaseYear}</div>
                </div>
              </div>
            )}

            {/* Status */}
            {anime.status && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: '#9290C3' }} />
                <div>
                  <div className="text-xs" style={{ color: '#9290C3' }}>Status</div>
                  <div className="text-white font-medium">{anime.status}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}