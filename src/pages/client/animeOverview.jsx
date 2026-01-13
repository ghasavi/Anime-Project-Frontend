import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AnimeOverview() {
  const { id } = useParams(); // anime id from URL
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!anime) return <p className="text-center mt-10">Anime not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={anime.image}
          alt={anime.name}
          className="w-full md:w-1/3 rounded object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{anime.name}</h1>

          {anime.altNames && anime.altNames.length > 0 && (
            <p className="text-gray-500 mb-2">
              Also known as: {anime.altNames.join(", ")}
            </p>
          )}

          <p className="mb-4">{anime.description}</p>

          {anime.genres && (
            <p className="mb-2">
              <strong>Genres:</strong> {anime.genres.join(", ")}
            </p>
          )}

          {anime.tags && anime.tags.length > 0 && (
            <p className="mb-2">
              <strong>Tags:</strong> {anime.tags.join(", ")}
            </p>
          )}

          {anime.releaseYear && (
            <p className="mb-2">
              <strong>Release Year:</strong> {anime.releaseYear}
            </p>
          )}

          {anime.rating && (
            <p className="mb-2">
              <strong>Rating:</strong> ⭐ {anime.rating}/5
            </p>
          )}

          {anime.episodes && (
            <p className="mb-2">
              <strong>Episodes:</strong> {anime.episodes}
            </p>
          )}

          {anime.status && (
            <p className="mb-2">
              <strong>Status:</strong> {anime.status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
