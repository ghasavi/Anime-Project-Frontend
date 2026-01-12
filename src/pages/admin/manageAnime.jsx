import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ManageAnime() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendURL = "http://localhost:3000/api/animes";

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
    if (!confirm("Are you sure you want to delete this anime?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${backendURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Anime deleted");
      fetchAnimes();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete anime");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Anime</h2>
        <button
          onClick={() => navigate("/admin/add-anime")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Anime
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : animes.length === 0 ? (
        <p>No anime found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Genres</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {animes.map((anime, idx) => (
                <tr key={anime._id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{idx + 1}</td>
                  <td className="p-2 border text-center">
                    {anime.image ? (
                      <img
                        src={anime.image}
                        alt={anime.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td className="p-2 border">{anime.name}</td>
                  <td className="p-2 border">{anime.genres.join(", ")}</td>
                  <td className="p-2 border">{anime.status}</td>
                  <td className="p-2 border">{anime.rating}</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit-anime/${anime._id}`)}
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(anime._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
