import { useNavigate } from "react-router-dom";
import { Sparkles, Film, Users, Trophy, Heart, Shield, ArrowRight, Star, Zap, BookOpen, Search, Brain, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
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
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background decorative elements - Enhanced like Footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-[#535C91]/10 to-[#9290C3]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-gradient-to-r from-[#1B1A55]/10 to-[#535C91]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-[#9290C3]/5 to-[#535C91]/10 rounded-full blur-3xl"></div>
        
        {/* Floating particles - Same as Footer */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 100 + 10}px`,
              height: `${Math.random() * 100 + 10}px`,
              background: `radial-gradient(circle, #9290C3, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.1 + 0.02,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo/Badge - Enhanced with floating animation */}
            <motion.div 
              className="inline-flex items-center justify-center p-6 mb-8 rounded-2xl"
              style={{
                background: "linear-gradient(45deg, #535C91, #1B1A55)",
                boxShadow: "0 8px 32px rgba(27, 26, 85, 0.4)"
              }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Sparkles className="w-14 h-14 text-white" />
            </motion.div>
            
            {/* Main Heading with gradient text */}
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">Welcome to </span>
              <span className="bg-gradient-to-r from-[#9290C3] via-[#535C91] to-[#1B1A55] bg-clip-text text-transparent">
                AniRec
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
              style={{ color: '#9290C3' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your intelligent anime recommendation system that learns your taste and delivers perfect matches
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={() => navigate("/recommend")}
                className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                style={{
                  background: "linear-gradient(45deg, #535C91, #1B1A55)",
                  boxShadow: "0 4px 30px rgba(83, 92, 145, 0.4)"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span>Get Anime Recommendations</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => navigate("/genres")}
                className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border"
                style={{
                  borderColor: '#9290C3',
                  color: '#9290C3',
                  backgroundColor: 'rgba(146, 144, 195, 0.15)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse All Genres
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Why <span style={{ color: '#9290C3' }}>AniRec</span> Stands Out
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9290C3' }}>
              Advanced technology meets anime expertise for perfect recommendations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-10 h-10" style={{ color: '#9290C3' }} />,
                title: "Smart AI Matching",
                description: "Advanced algorithms analyze your preferences to find perfect anime matches",
              },
              {
                icon: <Film className="w-10 h-10" style={{ color: '#9290C3' }} />,
                title: "Vast Anime Library",
                description: "Thousands of anime from all genres, eras, and animation styles",
              },
              {
                icon: <Shield className="w-10 h-10" style={{ color: '#9290C3' }} />,
                title: "Trusted Accuracy",
                description: "98% user satisfaction with our personalized recommendations",
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="group h-full p-8 rounded-2xl border border-white/10 hover:border-[#535C91]/50 transition-all duration-300 backdrop-blur-xl bg-white/5 hover:bg-white/10">
                  <motion.div 
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#535C91]/30 to-[#1B1A55]/30 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p style={{ color: '#9290C3' }}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-[#535C91]/50 transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                     style={{ 
                       background: "linear-gradient(45deg, #535C91, #1B1A55)",
                       color: 'white'
                     }}>
                  <Trophy className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold">About AniRec</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Revolutionizing Anime Discovery
                </h2>
                <p className="mb-6 text-lg" style={{ color: '#9290C3' }}>
                  AniRec was born from a passion for anime and technology. We believe everyone deserves 
                  to find anime that resonates with their unique taste, without the endless searching.
                </p>
                <p className="mb-8 text-lg" style={{ color: '#9290C3' }}>
                  Our team combines machine learning expertise with deep anime knowledge to create 
                  the most accurate recommendation system available.
                </p>
                
                <motion.button
                  onClick={() => navigate("/login")}
                  className="group relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
                  style={{
                    background: "linear-gradient(45deg, #535C91, #1B1A55)"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span>Explore Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
            
            {/* Right Stats */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-[#535C91]/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Our Community Impact
                </h3>
                
                <div className="space-y-6">
                  {[
                    { 
                      icon: <Users className="w-6 h-6" style={{ color: '#9290C3' }} />, 
                      value: "10K+", 
                      label: "Active Anime Fans", 
                    },
                    { 
                      icon: <BookOpen className="w-6 h-6" style={{ color: '#9290C3' }} />, 
                      value: "5K+", 
                      label: "Anime Titles", 
                    },
                    { 
                      icon: <Heart className="w-6 h-6" style={{ color: '#9290C3' }} />, 
                      value: "98%", 
                      label: "User Satisfaction", 
                    },
                    { 
                      icon: <Star className="w-6 h-6" style={{ color: '#9290C3' }} />, 
                      value: "1M+", 
                      label: "Recommendations", 
                    }
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(146, 144, 195, 0.1)' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div style={{ color: '#9290C3' }}>{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-[#535C91]/50 transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                   style={{ 
                     background: "linear-gradient(45deg, #535C91, #1B1A55)",
                     color: 'white'
                   }}>
                <Search className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold">How It Works</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                Simple Process, Powerful Results
              </h3>
              <div className="space-y-6">
                {[
                  { number: "1", title: "Answer Questions", desc: "Share your preferences through our intuitive quiz" },
                  { number: "2", title: "AI Analysis", desc: "Our algorithms analyze thousands of data points" },
                  { number: "3", title: "Get Recommendations", desc: "Receive personalized anime suggestions" },
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#535C91] to-[#1B1A55] flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white font-bold">{step.number}</span>
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                      <p style={{ color: '#9290C3' }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-[#535C91]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" style={{ color: '#9290C3' }} />
                Perfect For
              </h4>
              <div className="space-y-4">
                {[
                  "Anime beginners looking for starting points",
                  "Seasoned fans wanting to discover hidden gems",
                  "People with specific mood preferences",
                  "Those tired of endless scrolling through lists"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#9290C3' }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    ></motion.div>
                    <span style={{ color: '#9290C3' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center p-12 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-[#535C91]/50 transition-all duration-300 bg-white/5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <motion.div 
              className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ 
                background: "linear-gradient(45deg, #535C91, #1B1A55)",
                boxShadow: "0 8px 32px rgba(27, 26, 85, 0.4)"
              }}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Discover Your Next Favorite Anime?
            </h2>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#9290C3' }}>
              Join our community of anime enthusiasts and let our intelligent system 
              guide you to amazing shows you'll love.
            </p>
            
            <motion.button
              onClick={() => navigate("/recommend")}
              className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(45deg, #535C91, #1B1A55)",
                boxShadow: "0 4px 30px rgba(83, 92, 145, 0.4)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="flex items-center justify-center gap-3">
                Start Free Recommendations
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <p className="text-sm mt-6" style={{ color: '#9290C3' }}>
              No registration required • Completely free
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:border-[#535C91]/50 transition-all duration-300">
              <Shield className="w-4 h-4" style={{ color: '#9290C3' }} />
              <span className="text-sm" style={{ color: '#9290C3' }}>Secure & Private</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}