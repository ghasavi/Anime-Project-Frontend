export default function RecommendedAnimeCard({ anime }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col md:flex-row gap-6">
      {/* Image */}
      <img
        src={anime.image}
        alt={anime.name}
        className="w-full md:w-48 h-64 object-cover rounded"
      />

      {/* Details */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{anime.name}</h2>

        {/* Genres */}
        {anime.genres?.length > 0 && (
          <p>
            <span className="font-semibold">Genres:</span> {anime.genres.join(", ")}
          </p>
        )}

        {/* Rating */}
        {anime.rating !== undefined && (
          <p>
            <span className="font-semibold">Rating:</span> ⭐ {anime.rating}/5
          </p>
        )}

        {/* Episodes */}
        {anime.episodes !== undefined && (
          <p>
            <span className="font-semibold">Episodes:</span> {anime.episodes}
          </p>
        )}

        {/* Status */}
        {anime.status && (
          <p>
            <span className="font-semibold">Status:</span> {anime.status}
          </p>
        )}

        {/* Release Year */}
        {anime.releaseYear && (
          <p>
            <span className="font-semibold">Release Year:</span> {anime.releaseYear}
          </p>
        )}

        {/* Description */}
        {anime.description && (
          <p className="mt-2 text-gray-700">{anime.description}</p>
        )}
      </div>
    </div>
  );
}
