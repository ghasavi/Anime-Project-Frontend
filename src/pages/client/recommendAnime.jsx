import { useEffect, useState } from "react";
import axios from "axios";
import RecommendedAnimeCard from "../../components/RecommendedAnimeCard.jsx";
import { Sparkles, ArrowRight, RefreshCw, Filter, Calendar, Star, Film, CheckCircle, ChevronRight } from "lucide-react";

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
  const prevStep = () => setStep(prev => prev - 1);

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
    }}>
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div className="w-16 h-16 border-4 border-#535C91/30 border-t-#9290C3 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #070F2B 0%, #1B1A55 50%, #070F2B 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              background: `radial-gradient(circle, #9290C3, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-2xl animate-float"
               style={{
                 background: "linear-gradient(45deg, #535C91, #1B1A55)",
                 boxShadow: "0 8px 32px rgba(27, 26, 85, 0.4)"
               }}>
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Find Your Perfect Anime
          </h1>
          <p className="text-lg" style={{ color: '#9290C3' }}>
            Answer a few questions for personalized recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Filter className="w-5 h-5" style={{ color: '#9290C3' }} />
              Step {step} of 5
            </h2>
            <div className="text-sm" style={{ color: '#9290C3' }}>
              {step * 20}% Complete
            </div>
          </div>
          
          <div className="w-full h-2 rounded-full bg-white/10 mb-2">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{
                background: "linear-gradient(90deg, #535C91, #9290C3)",
                width: `${step * 20}%`
              }}
            ></div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8">
          {/* Step Sections */}
          {!recommendation && !noResult && step === 1 && (
            <StepSection 
              title="Select Your Favorite Genre(s)" 
              description="Choose one or multiple genres you enjoy"
              icon={<Filter className="w-5 h-5" />}
              options={GENRES} 
              selected={filters.genres} 
              multi 
              onSelect={val => toggleSelection(val, "genres")} 
              nextStep={nextStep}
              step={step}
              canGoBack={false}
              prevStep={prevStep}
            />
          )}
          {!recommendation && !noResult && step === 2 && (
            <StepSection 
              title="Release Year Preference" 
              description="How recent do you want the anime to be?"
              icon={<Calendar className="w-5 h-5" />}
              options={YEARS} 
              selected={filters.year} 
              onSelect={val => toggleSelection(val, "year")} 
              nextStep={nextStep}
              step={step}
              canGoBack={true}
              prevStep={prevStep}
            />
          )}
          {!recommendation && !noResult && step === 3 && (
            <StepSection 
              title="Minimum Rating" 
              description="Quality filter based on user ratings"
              icon={<Star className="w-5 h-5" />}
              options={RATINGS} 
              selected={filters.rating} 
              onSelect={val => toggleSelection(val, "rating")} 
              nextStep={nextStep}
              step={step}
              canGoBack={true}
              prevStep={prevStep}
            />
          )}
          {!recommendation && !noResult && step === 4 && (
            <StepSection 
              title="Episode Length" 
              description="How much time do you want to invest?"
              icon={<Film className="w-5 h-5" />}
              options={EPISODES} 
              selected={filters.episodes} 
              onSelect={val => toggleSelection(val, "episodes")} 
              nextStep={nextStep}
              step={step}
              canGoBack={true}
              prevStep={prevStep}
            />
          )}
          {!recommendation && !noResult && step === 5 && (
            <StepSection 
              title="Series Status" 
              description="Do you prefer completed series or ongoing?"
              icon={<CheckCircle className="w-5 h-5" />}
              options={STATUS} 
              selected={filters.status} 
              onSelect={val => toggleSelection(val, "status")}
              step={step}
              canGoBack={true}
              prevStep={prevStep}
            />
          )}

          {/* Get Recommendation Button */}
          {!recommendation && !noResult && step === 5 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleRecommend}
                className="group px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                style={{
                  background: "linear-gradient(45deg, #535C91, #1B1A55)",
                  boxShadow: "0 4px 20px rgba(83, 92, 145, 0.3)"
                }}
              >
                <span>Get My Recommendation</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          )}

          {/* Recommendation Display */}
          {recommendation && (
            <div className="mt-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">🎉 Perfect Match Found!</h3>
                <p className="text-lg" style={{ color: '#9290C3' }}>Based on your preferences, we recommend:</p>
              </div>
              
              <div className="flex justify-center">
                <RecommendedAnimeCard anime={recommendation} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={handleRecommend}
                  className="group px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(45deg, #535C91, #1B1A55)"
                  }}
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  Try Another
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border"
                  style={{
                    borderColor: '#9290C3',
                    color: '#9290C3',
                    backgroundColor: 'rgba(146, 144, 195, 0.1)'
                  }}
                >
                  Start Over
                </button>
              </div>
            </div>
          )}

          {/* No Result */}
          {noResult && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-#535C91/20 to-#1B1A55/20 flex items-center justify-center mx-auto mb-4">
                <Filter className="w-10 h-10" style={{ color: '#9290C3' }} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No Matches Found</h3>
              <p className="mb-6" style={{ color: '#9290C3' }}>
                No anime matches your current filters. Try broadening your preferences.
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-lg text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(45deg, #535C91, #1B1A55)"
                }}
              >
                Adjust Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Updated Step Section Component
function StepSection({ title, description, icon, options, selected, onSelect, nextStep, step, canGoBack, prevStep, multi }) {
  const isNextVisible = multi ? selected.length > 0 : selected;

  return (
    <div>
      {/* Step Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-lg" style={{ color: '#9290C3' }}>{description}</p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`p-4 rounded-xl border transition-all duration-300 text-left group hover:scale-[1.02] ${
              multi 
                ? (selected.includes(opt) 
                    ? 'border-transparent text-white' 
                    : 'border-white/10 text-#9290C3 hover:border-#535C91/50')
                : (selected === opt 
                    ? 'border-transparent text-white' 
                    : 'border-white/10 text-#9290C3 hover:border-#535C91/50')
            }`}
            style={{
              background: multi 
                ? (selected.includes(opt) 
                    ? 'linear-gradient(45deg, #535C91, #1B1A55)' 
                    : 'rgba(146, 144, 195, 0.1)')
                : (selected === opt 
                    ? 'linear-gradient(45deg, #535C91, #1B1A55)' 
                    : 'rgba(146, 144, 195, 0.1)')
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{opt}</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {canGoBack && (
          <button
            onClick={prevStep}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{
              color: '#9290C3',
              backgroundColor: 'rgba(146, 144, 195, 0.1)'
            }}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Previous
          </button>
        )}
        
        {nextStep && isNextVisible && (
          <button
            onClick={nextStep}
            className="ml-auto group px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{
              background: "linear-gradient(45deg, #535C91, #1B1A55)"
            }}
          >
            Next Step
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Selection Indicator */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
             style={{ backgroundColor: 'rgba(146, 144, 195, 0.15)' }}>
          <span className="text-sm" style={{ color: '#9290C3' }}>
            {multi 
              ? `${selected.length} genre${selected.length !== 1 ? 's' : ''} selected`
              : selected}
          </span>
        </div>
      </div>
    </div>
  );
}