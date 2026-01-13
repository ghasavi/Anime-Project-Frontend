import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";

const GENRE_OPTIONS = [
  "Action",
  "Adventure",
  "Fantasy",
  "Romance",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
];

export default function EditAnime() {
  const { id } = useParams(); // anime id
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [status, setStatus] = useState("Completed");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const backendURL = "http://localhost:3000/api/animes";

  /* ================= FETCH ANIME ================= */
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // make sure you have this set
      const { data } = await axios.get(`${backendURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const anime = data.anime || data;

        setName(anime.name || "");
        setAltNames(anime.altNames?.join(", ") || "");
        setDescription(anime.description || "");
        setGenres(anime.genres || []);
        setTags(anime.tags?.join(", ") || "");
        setReleaseYear(anime.releaseYear || "");
        setRating(anime.rating || "");
        setEpisodes(anime.episodes || "");
        setStatus(anime.status || "Completed");
        setExistingImage(anime.image || "");
       } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to load anime");
    }
  };

    fetchAnime();
  }, [id]);

  const toggleGenre = (genre) => {
    setGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const token = localStorage.getItem("adminToken");
    if (!token) return toast.error("Admin token missing");

    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!name.trim()) newErrors.name = "Anime name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (genres.length === 0)
      newErrors.genres = "Select at least one genre";

    if (rating && (rating < 1 || rating > 5))
      newErrors.rating = "Rating must be between 1 and 5";

    if (releaseYear) {
      if (!/^\d{4}$/.test(releaseYear))
        newErrors.releaseYear = "Enter a valid 4-digit year";
      else if (releaseYear > currentYear)
        newErrors.releaseYear = "Release year cannot be in the future";
    }

    if (episodes && episodes <= 0)
      newErrors.episodes = "Episodes must be a positive number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      let imageURL = existingImage;

      // upload new image only if changed
      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { error } = await supabase.storage
          .from("images")
          .upload(fileName, imageFile);

        if (error) throw new Error("Image upload failed");

        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        imageURL = data.publicUrl;
      }

      const animeData = {
        name,
        altNames: altNames
          ? altNames.split(",").map((n) => n.trim())
          : [],
        description,
        genres,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        releaseYear: releaseYear ? parseInt(releaseYear) : undefined,
        rating: rating ? parseFloat(rating) : undefined,
        image: imageURL,
        episodes: episodes ? parseInt(episodes) : undefined,
        status,
      };

      await axios.put(`${backendURL}/${id}`, animeData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Anime updated successfully");
      navigate("/admin/manage-anime");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update anime");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Anime</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Anime Name"
          className="border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="text"
          value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          placeholder="Alternative Names"
          className="border p-2 rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}

        {/* GENRES */}
        <div>
          <p className="font-medium mb-1">Genres</p>
          <div className="flex flex-wrap gap-3">
            {GENRE_OPTIONS.map((genre) => (
              <label key={genre} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={genres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
          {errors.genres && (
            <p className="text-red-500 text-sm">{errors.genres}</p>
          )}
        </div>

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (optional)"
          className="border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Release Year"
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (1-5)"
            className="border p-2 rounded flex-1"
          />
        </div>

        {errors.releaseYear && (
          <p className="text-red-500 text-sm">{errors.releaseYear}</p>
        )}
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating}</p>
        )}

        {existingImage && (
          <img
            src={existingImage}
            alt="Current"
            className="w-40 rounded border"
          />
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <input
          type="number"
          min="1"
          value={episodes}
          onChange={(e) => setEpisodes(e.target.value)}
          placeholder="Number of Episodes"
          className="border p-2 rounded"
        />
        {errors.episodes && (
          <p className="text-red-500 text-sm">{errors.episodes}</p>
        )}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Anime"}
        </button>
      </form>
    </div>
  );
}
