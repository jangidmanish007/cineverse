"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecommendationsSection from "@/components/RecommendationsSection";
import SocialPanel from "@/components/SocialPanel";
import { getPopularMovies } from "@/lib/api";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      // Load multiple pages for better recommendations
      const page1 = await getPopularMovies(1);
      const page2 = await getPopularMovies(2);
      const page3 = await getPopularMovies(3);
      setAllMovies([...page1, ...page2, ...page3]);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar onSearch={setSearchQuery} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-red-500" />
            <h1 className="text-5xl font-bold">Discover</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Personalized recommendations and social features
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Recommendations */}
          <div>
            <RecommendationsSection allMovies={allMovies} />
          </div>

          {/* Social Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <SocialPanel />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
