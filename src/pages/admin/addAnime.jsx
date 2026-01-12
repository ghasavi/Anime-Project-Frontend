import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";

export default function AddAnime() {
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState("");
  const [tags, setTags] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [episodes, setEpisodes] = useState("");
  const [status, setStatus] = useState("Completed");
  const [loading, setLoading] = useState(false);

  // ref for clearing file input
  const fileInputRef = useRef(null);

  const backendURL = "http://localhost:3000/api/animes";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.warn("Admin token missing");
      return toast.error("Admin token missing. Please login.");
    }

    if (!imageFile) {
      console.warn("No image selected");
      return toast.error("Please select an image");
    }

    setLoading(true);

    try {
      // 1️⃣ Upload image to Supabase
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        throw new Error(uploadError.message || "Failed to upload image");
      }

      // 2️⃣ Get public URL correctly
      const { data } = supabase.storage.from("images").getPublicUrl(fileName);
      const publicURL = data?.publicUrl;

      if (!publicURL) {
        console.error("Supabase URL error: public URL not found");
        throw new Error("Failed to get image URL");
      }

      console.log("Supabase image uploaded:", publicURL);

      // 3️⃣ Prepare anime data
      const animeData = {
        name,
        altNames: altNames ? altNames.split(",").map((n) => n.trim()) : [],
        description,
        genres: genres ? genres.split(",").map((g) => g.trim()) : [],
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        releaseYear: releaseYear ? parseInt(releaseYear) : undefined,
        rating: rating ? parseFloat(rating) : 0,
        image: publicURL,
        episodes: episodes ? parseInt(episodes) : 0,
        status,
      };

      console.log("Sending anime data to backend:", animeData);

      // 4️⃣ POST to backend
      const { data: response } = await axios.post(backendURL, animeData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Anime added successfully:", response);
      toast.success(response.message || "Anime added successfully!");

      // 5️⃣ Reset form
      setName("");
      setAltNames("");
      setDescription("");
      setGenres("");
      setTags("");
      setReleaseYear("");
      setRating("");
      setImageFile(null);
      setEpisodes("");
      setStatus("Completed");

      if (fileInputRef.current) fileInputRef.current.value = ""; // clear file input
    } catch (err) {
      console.error("Error adding anime:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to add anime";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Add New Anime</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Anime Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Alternative Names (comma separated)"
          value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Genres (comma separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Release Year"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 rounded flex-1"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Number of Episodes"
          value={episodes}
          onChange={(e) => setEpisodes(e.target.value)}
          className="border p-2 rounded"
        />

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
          className="bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Adding..." : "Add Anime"}
        </button>
      </form>
    </div>
  );
}
