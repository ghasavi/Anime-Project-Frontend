import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AnimeCard from "../../components/AnimeCard.jsx";

const GENRE_OPTIONS = [
  "Action", "Adventure", "Fantasy", "Romance", "Comedy",
  "Drama", "Horror", "Sci-Fi", "Slice of Life", "Sports"
];

export default function Genre() {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState(""); // "year" or "rating"
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

    // Genre filter
    if (selectedGenre !== "All") {
      temp = temp.filter(anime => anime.genres?.includes(selectedGenre));
    }

    // Search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      temp = temp.filter(anime => anime.name.toLowerCase().includes(lower));
    }

    // Sort
    if (sortBy === "year") {
      temp.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
    } else if (sortBy === "rating") {
      temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredAnimes(temp);
  }, [selectedGenre, sortBy, search, animes]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Anime</h2>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Genres</option>
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="year">Release Year</option>
          <option value="rating">Rating</option>
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
      </div>

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : filteredAnimes.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAnimes.map((anime) => (
            <AnimeCard key={anime._id} anime={anime} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-500">No animes available.</p>
      )}
    </div>
  );
}
