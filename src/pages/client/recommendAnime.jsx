import { useEffect, useState } from "react";
import axios from "axios";
import RecommendedAnimeCard from "../../components/RecommendedAnimeCard.jsx";

const GENRES = ["Action","Adventure","Fantasy","Romance","Comedy","Drama","Horror","Sci-Fi","Slice of Life","Sports"];
const YEARS = ["Last 10 Years", "Last 5 Years", "This Year", "I don't care"];
const RATINGS = ["5 - Popular", "4+", "3+", "I don't care"];
const EPISODES = ["1-12","1-24","1-50","1-100","100+","I don't care"];
const STATUS = ["Ongoing","Completed","I don't care"];

export default function RecommendAnime() {
  const [animes, setAnimes] = useState([]);
  const [filters, setFilters] = useState({
    genres: [],
    year: "I don't care",
    rating: "I don't care",
    episodes: "I don't care",
    status: "I don't care",
  });
  const [step, setStep] = useState(1);
  const [recommendation, setRecommendation] = useState(null);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:3000/api/animes";

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const { data } = await axios.get(backendURL);
        setAnimes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimes();
  }, []);

  const toggleSelection = (value, type) => {
    if (type === "genres") {
      setFilters(prev => ({
        ...prev,
        genres: prev.genres.includes(value) 
          ? prev.genres.filter(g => g !== value)
          : [...prev.genres, value]
      }));
    } else {
      setFilters(prev => ({ ...prev, [type]: value }));
    }
  };

  const nextStep = () => setStep(prev => prev + 1);

  const handleRecommend = () => {
    let filtered = [...animes];
    const currentYear = new Date().getFullYear();

    if (filters.genres.length) {
      filtered = filtered.filter(a => filters.genres.some(g => a.genres?.includes(g)));
    }

    filtered = filtered.filter(a => {
      if (!a.releaseYear) return false;
      switch(filters.year) {
        case "Last 10 Years": return a.releaseYear >= currentYear - 10;
        case "Last 5 Years": return a.releaseYear >= currentYear - 5;
        case "This Year": return a.releaseYear === currentYear;
        case "I don't care": return true;
        default: return true;
      }
    });

    filtered = filtered.filter(a => {
      if (!a.rating) return false;
      switch(filters.rating) {
        case "5 - Popular": return a.rating >= 5;
        case "4+": return a.rating >= 4;
        case "3+": return a.rating >= 3;
        case "I don't care": return true;
        default: return true;
      }
    });

    filtered = filtered.filter(a => {
      if (!a.episodes) return true;
      switch(filters.episodes) {
        case "1-12": return a.episodes >=1 && a.episodes <=12;
        case "1-24": return a.episodes >=1 && a.episodes <=24;
        case "1-50": return a.episodes >=1 && a.episodes <=50;
        case "1-100": return a.episodes >=1 && a.episodes <=100;
        case "100+": return a.episodes >100;
        case "I don't care": return true;
        default: return true;
      }
    });

    filtered = filtered.filter(a => {
      if (!a.status) return true;
      return filters.status === "I don't care" || a.status === filters.status;
    });

    if (!filtered.length) {
      setRecommendation(null);
      setNoResult(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    setRecommendation(filtered[randomIndex]);
    setNoResult(false);
  };

  const resetQuiz = () => {
    setStep(1);
    setFilters({ genres: [], year: "I don't care", rating: "I don't care", episodes: "I don't care", status: "I don't care" });
    setRecommendation(null);
    setNoResult(false);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Recommend Me an Anime!</h2>

      {/* Step Sections */}
      {!recommendation && !noResult && step === 1 && (
        <StepSection title="Select Genre(s):" options={GENRES} selected={filters.genres} multi onSelect={val => toggleSelection(val, "genres")} nextStep={nextStep} />
      )}
      {!recommendation && !noResult && step === 2 && (
        <StepSection title="Select Year:" options={YEARS} selected={filters.year} onSelect={val => toggleSelection(val, "year")} nextStep={nextStep} />
      )}
      {!recommendation && !noResult && step === 3 && (
        <StepSection title="Select Rating:" options={RATINGS} selected={filters.rating} onSelect={val => toggleSelection(val, "rating")} nextStep={nextStep} />
      )}
      {!recommendation && !noResult && step === 4 && (
        <StepSection title="Select Number of Episodes:" options={EPISODES} selected={filters.episodes} onSelect={val => toggleSelection(val, "episodes")} nextStep={nextStep} />
      )}
      {!recommendation && !noResult && step === 5 && (
        <StepSection title="Select Status:" options={STATUS} selected={filters.status} onSelect={val => toggleSelection(val, "status")} />
      )}

      {/* Get Recommendation Button */}
      {!recommendation && !noResult && step === 5 && (
        <button
          onClick={handleRecommend}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 transition mt-4"
        >
          Get Recommendation
        </button>
      )}

      {/* Recommendation Display */}
{recommendation && (
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">We recommend:</h3>
    <RecommendedAnimeCard anime={recommendation} />
    <button
      onClick={handleRecommend}
      className="mt-4 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 transition"
    >
      Get Another Recommendation
    </button>
  </div>
)}


      {/* No Result */}
      {noResult && (
        <div className="mt-6 text-center text-red-600 font-bold">
          No recommendation found.{" "}
          <button onClick={resetQuiz} className="underline text-blue-600">
            Retake the Quiz
          </button>
        </div>
      )}
    </div>
  );
}

// Reusable Step Section Component
function StepSection({ title, options, selected, onSelect, nextStep, multi }) {
  const isNextVisible = multi ? selected.length > 0 : selected;

  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">{title}</p>
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-4 py-2 rounded-full border transition ${
              multi ? (selected.includes(opt) ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-200")
                    : (selected === opt ? "bg-yellow-400 text-blue-900" : "bg-white text-gray-800 hover:bg-gray-200")
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {nextStep && isNextVisible && (
        <button
          onClick={nextStep}
          className="mt-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
        >
          Next
        </button>
      )}
    </div>
  );
}
