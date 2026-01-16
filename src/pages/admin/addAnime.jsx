import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";
import {
  Plus,
  Upload,
  X,
  Image as ImageIcon,
  Tag,
  Calendar,
  Star,
  Film,
  Hash,
  Globe,
  CheckCircle,
  Loader2,
  Sparkles,
  Award,
  FolderPlus
} from "lucide-react";

const GENRE_OPTIONS = [
  "Action", "Adventure", "Fantasy", "Romance", "Comedy",
  "Drama", "Horror", "Sci-Fi", "Slice of Life", "Sports",
  "Mystery", "Supernatural", "Mecha", "Psychological", "Thriller"
];

const STATUS_OPTIONS = [
  { value: "Ongoing", label: "Ongoing", color: "text-green-400" },
  { value: "Completed", label: "Completed", color: "text-blue-400" },
  { value: "Upcoming", label: "Upcoming", color: "text-purple-400" }
];

export default function AddAnime() {
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [status, setStatus] = useState("Completed");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const backendURL = "http://localhost:3000/api/animes";

  const toggleGenre = (genre) => {
    setGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const token = localStorage.getItem("adminToken");
    if (!token) return toast.error("Admin token missing. Please login.");

    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!name.trim()) newErrors.name = "Anime name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (genres.length === 0) newErrors.genres = "Select at least one genre";

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

    if (!imageFile) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Upload image
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, imageFile);

      if (uploadError) throw new Error("Image upload failed");

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

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
        image: data.publicUrl,
        episodes: episodes ? parseInt(episodes) : undefined,
        status,
      };

      const res = await axios.post(backendURL, animeData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data?.message || "Anime added successfully");

      // Reset form
      setName("");
      setAltNames("");
      setDescription("");
      setGenres([]);
      setTags("");
      setReleaseYear("");
      setRating("");
      setEpisodes("");
      setStatus("Completed");
      setImageFile(null);
      setImagePreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add anime"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .form-input:focus {
          box-shadow: 0 0 0 2px rgba(83, 92, 145, 0.5);
        }
        .genre-checkbox:checked {
          background-color: #535C91;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-#535C91 to-#1B1A55">
            <FolderPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Add New Anime</h1>
            <p className="text-gray-400">Create a new anime entry for your collection</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 mt-8">
          {[
            { label: "Basic Info", icon: <Film className="w-4 h-4" /> },
            { label: "Details", icon: <Tag className="w-4 h-4" /> },
            { label: "Media", icon: <ImageIcon className="w-4 h-4" /> },
            { label: "Review", icon: <CheckCircle className="w-4 h-4" /> }
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${idx < 2 ? 'bg-gradient-to-r from-#535C91 to-#1B1A55' : 'bg-gray-700/50'}`}>
                {step.icon}
              </div>
              <span className={`text-sm ${idx < 2 ? 'text-white' : 'text-gray-500'}`}>
                {step.label}
              </span>
              {idx < 3 && (
                <div className={`h-1 w-full mt-2 ${idx < 1 ? 'bg-gradient-to-r from-#535C91 to-#1B1A55' : 'bg-gray-700/50'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Basic Information */}
              <div className="border-b border-white/10 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Film className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Anime Name */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Anime Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter anime title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none form-input transition-all duration-300"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Alternative Names */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Alternative Names
                    </label>
                    <input
                      type="text"
                      placeholder="Comma-separated alternative titles"
                      value={altNames}
                      onChange={(e) => setAltNames(e.target.value)}
                      className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none form-input transition-all duration-300"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2 group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Description *
                    </label>
                    <textarea
                      placeholder="Write a detailed description of the anime..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none form-input resize-none transition-all duration-300"
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Details & Genres */}
              <div className="border-b border-white/10 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Tag className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Details & Genres</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Genres Selection */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Genres *
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {GENRE_OPTIONS.map((genre) => (
                        <label
                          key={genre}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                            genres.includes(genre)
                              ? 'bg-#535C91/30 border border-#535C91/50'
                              : 'bg-black/20 border border-white/10 hover:bg-white/5'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={genres.includes(genre)}
                            onChange={() => toggleGenre(genre)}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            genres.includes(genre)
                              ? 'bg-#535C91 border-#535C91'
                              : 'border-gray-500'
                          }`}>
                            {genres.includes(genre) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-gray-300">{genre}</span>
                        </label>
                      ))}
                    </div>
                    {errors.genres && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> {errors.genres}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Tags, Rating, Year */}
                  <div className="space-y-6">
                    {/* Tags */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Comma-separated tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none form-input transition-all duration-300"
                      />
                    </div>

                    {/* Year & Rating */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Release Year
                        </label>
                        <input
                          type="number"
                          placeholder="2024"
                          value={releaseYear}
                          onChange={(e) => setReleaseYear(e.target.value)}
                          className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none form-input transition-all duration-300"
                        />
                        {errors.releaseYear && (
                          <p className="mt-2 text-sm text-red-400">{errors.releaseYear}</p>
                        )}
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Rating
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          placeholder="4.5"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none form-input transition-all duration-300"
                        />
                        {errors.rating && (
                          <p className="mt-2 text-sm text-red-400">{errors.rating}</p>
                        )}
                      </div>
                    </div>

                    {/* Episodes & Status */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Episodes
                        </label>
                        <input
                          type="number"
                          min="1"
                          placeholder="12"
                          value={episodes}
                          onChange={(e) => setEpisodes(e.target.value)}
                          className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white placeholder-gray-400 focus:outline-none form-input transition-all duration-300"
                        />
                        {errors.episodes && (
                          <p className="mt-2 text-sm text-red-400">{errors.episodes}</p>
                        )}
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Status
                        </label>
                        <div className="relative">
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-3 bg-black/20 border border-#535C91/30 rounded-xl text-white focus:outline-none form-input appearance-none transition-all duration-300"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value} className="bg-#1B1A55">
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <div className={`w-2 h-2 rounded-full ${
                              STATUS_OPTIONS.find(o => o.value === status)?.color.replace('text-', 'bg-')
                            }`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Image Upload */}
              <div className="pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <ImageIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Cover Image *</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Upload Area */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Upload Anime Cover
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-#535C91 hover:bg-white/5 ${
                        imagePreview ? 'border-#535C91/50' : 'border-white/20'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-xl mb-4"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                            className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors duration-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-#9290C3" />
                          </div>
                          <p className="text-gray-300 mb-2">Click to upload image</p>
                          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </div>
                    {errors.image && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> {errors.image}
                      </p>
                    )}
                  </div>

                  {/* Preview & Requirements */}
                  <div className="space-y-6">
                    <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Requirements</h3>
                      <ul className="space-y-3">
                        {[
                          "High-quality anime cover image",
                          "Minimum resolution: 800×1200",
                          "Aspect ratio: 2:3 preferred",
                          "Max file size: 10MB",
                          "No watermarks or text overlays"
                        ].map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Selected Genres Preview */}
                    <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Selected Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {genres.length === 0 ? (
                          <p className="text-gray-500 text-sm">No genres selected yet</p>
                        ) : (
                          genres.map((genre) => (
                            <span
                              key={genre}
                              className="px-3 py-1.5 rounded-full bg-#535C91/30 text-#9290C3 border border-#535C91/50 text-sm"
                            >
                              {genre}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="text-sm text-gray-500">
                  All fields marked with * are required
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(45deg, #535C91, #1B1A55)",
                    boxShadow: "0 4px 20px rgba(83, 92, 145, 0.3)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="flex items-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Adding Anime...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add to Collection
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 rounded-xl border border-#535C91/30 bg-black/20 backdrop-blur-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Sparkles className="w-4 h-4" style={{ color: '#9290C3' }} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">
                After adding the anime, it will appear in your collection and be available for recommendations.
                Make sure all information is accurate before submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}