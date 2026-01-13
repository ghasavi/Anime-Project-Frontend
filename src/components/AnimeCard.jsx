import { useNavigate } from "react-router-dom";

export default function AnimeCard({ anime }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/anime/${anime._id}`)}
    >
      <img
        src={anime.image || "/placeholder.png"}
        alt={anime.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-2 text-center">
        <h2 className="font-semibold text-lg truncate">{anime.name}</h2>
      </div>
    </div>
  );
}
