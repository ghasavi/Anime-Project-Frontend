import { Instagram, Twitter, Heart, Palette, Mail, ArrowUpRight, Users, Sparkles, Brush, Package, Award, Shield, Home, Film, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-t from-[#070F2B] via-[#1B1A55] to-[#070F2B] border-t border-[#535C91]/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-gradient-to-r from-[#535C91]/10 to-[#9290C3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-gradient-to-r from-[#1B1A55]/10 to-[#535C91]/5 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 100 + 10}px`,
              height: `${Math.random() * 100 + 10}px`,
              background: `radial-gradient(circle, #9290C3, transparent)`,
              bottom: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.1 + 0.02,
              animation: `float ${Math.random() * 20 + 15}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#535C91] to-[#9290C3] rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#535C91] to-[#1B1A55] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#9290C3] to-[#535C91] bg-clip-text text-transparent">
                  AniRec
                </span>
                <p className="text-[10px] text-[#9290C3] tracking-wider">ANIME RECOMMENDATIONS</p>
              </div>
            </div>
            <p className="text-sm text-[#9290C3]/80 max-w-md leading-relaxed">
              Your ultimate anime discovery platform. 
              Intelligent recommendations powered by passion.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {[
                { icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                { icon: <Mail className="w-4 h-4" />, label: "Email" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gradient-to-r from-[#1B1A55]/50 to-[#070F2B]/50 border border-[#535C91]/30 rounded-lg hover:border-[#9290C3] hover:bg-gradient-to-r hover:from-[#535C91]/20 hover:to-[#9290C3]/20 transition-all duration-200 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  <div className="text-[#9290C3] hover:text-white transition-colors">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#9290C3]" />
              Explore
            </h4>
            <div className="space-y-3">
              {[
                { name: "Home", path: "/", icon: <Home className="w-3 h-3" /> },
                { name: "Genres", path: "/genres", icon: <Film className="w-3 h-3" /> },
                { name: "Admin", path: "/login", icon: <LayoutDashboard className="w-3 h-3" /> }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex items-center gap-3 text-sm text-[#9290C3]/80 hover:text-white transition-all duration-200"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.icon}
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#9290C3]" />
              Resources
            </h4>
            <div className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'FAQ', 'Support'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group flex items-center gap-3 text-sm text-[#9290C3]/80 hover:text-white transition-all duration-200"
                >
                  <div className="w-1 h-1 rounded-full bg-[#535C91] group-hover:bg-[#9290C3] transition-colors"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#9290C3]" />
              Stay Updated
            </h4>
            <p className="text-sm text-[#9290C3]/80">
              Get notified about new anime recommendations and features.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-[#070F2B]/50 border border-[#535C91]/30 rounded-lg text-white text-sm placeholder-[#9290C3]/50 focus:outline-none focus:border-[#9290C3] backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-[#535C91] to-[#1B1A55] text-white text-sm rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-xs text-[#9290C3]/50">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#535C91]/30 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-center md:text-left"
          >
            <p className="text-xs text-[#9290C3]">
              © {currentYear} AniRec • All anime data belongs to respective owners
            </p>
            <p className="text-xs text-[#9290C3]/50 mt-1">
              Intelligent recommendations powered by advanced algorithms
            </p>
          </motion.div>

          {/* Made with Love */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <Heart className="w-4 h-4 text-[#9290C3] animate-pulse" />
              <div className="absolute inset-0 bg-[#9290C3] rounded-full blur-sm opacity-20"></div>
            </div>
            <span className="text-xs text-[#9290C3]">
              Made with passion for anime
            </span>
          </motion.div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Support'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#9290C3] hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Anime Discovery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-10 pt-8 border-t border-[#535C91]/20 text-center"
        >
          <div className="inline-flex items-center gap-2 group cursor-pointer">
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#535C91]/10 to-[#9290C3]/10 group-hover:from-[#535C91]/20 group-hover:to-[#9290C3]/20 transition-all duration-200 backdrop-blur-sm">
              <Brush className="w-4 h-4 text-[#9290C3]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">
                Discover your next favorite anime?
              </p>
              <p className="text-xs text-[#9290C3] group-hover:text-white transition-colors">
                Get personalized recommendations today
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#535C91] group-hover:text-[#9290C3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#1B1A55]/30 to-[#070F2B]/30 border border-[#535C91]/20 rounded-lg backdrop-blur-sm">
            <Award className="w-3 h-3 text-[#9290C3]" />
            <span className="text-xs text-[#9290C3]">Secure Platform</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#1B1A55]/30 to-[#070F2B]/30 border border-[#535C91]/20 rounded-lg backdrop-blur-sm">
            <Package className="w-3 h-3 text-[#9290C3]" />
            <span className="text-xs text-[#9290C3]">Advanced AI</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#1B1A55]/30 to-[#070F2B]/30 border border-[#535C91]/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#9290C3]" />
            <span className="text-xs text-[#9290C3]">100% Accurate</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}