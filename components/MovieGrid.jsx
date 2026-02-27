"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

export default function MovieGrid({ movies, selectedCategory, setSelectedCategory, searchQuery, loading, currentPage, totalPages, onPageChange }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const categories = [
    { id: "popular", label: "Popular", icon: "🔥" },
    { id: "trending", label: "Trending", icon: "📈" },
    { id: "top-rated", label: "Top Rated", icon: "⭐" },
    { id: "hindi", label: "Hindi Movies", icon: "🇮🇳" },
    { id: "tamil", label: "Tamil Movies", icon: "🎬" },
    { id: "kdrama", label: "K-Drama", icon: "🇰🇷" },
    { id: "action", label: "Action", icon: "💥" },
    { id: "comedy", label: "Comedy", icon: "😂" },
    { id: "drama", label: "Drama", icon: "🎭" },
    { id: "thriller", label: "Thriller", icon: "😱" },
    { id: "horror", label: "Horror", icon: "👻" },
    { id: "romance", label: "Romance", icon: "💕" },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });

      setTimeout(() => {
        checkArrows();
      }, 300);
    }
  };

  const checkArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Category Tabs */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Desktop Tabs - Modern Card Style */}
          <div className="hidden lg:block">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 
                    flex items-center gap-2 shadow-lg overflow-hidden group cursor-pointer
                    ${selectedCategory === category.id
                      ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-red-600/50'
                      : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50 hover:border-gray-600'
                    }
                  `}
                >
                  {/* Animated background for active tab */}
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-linear-to-r from-red-600 to-red-700"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Content */}
                  <span className="relative z-10 text-xl">{category.icon}</span>
                  <span className="relative z-10 text-sm font-bold">{category.label}</span>

                  {/* Hover effect */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${selectedCategory !== category.id ? 'bg-linear-to-r from-gray-700/50 to-gray-600/50' : ''}
                  `} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Scrollable Tabs - Enhanced */}
          <div className="lg:hidden relative">
            {/* Left Arrow */}
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-linear-to-r from-gray-900 to-transparent hover:from-gray-800 text-white p-3 rounded-r-xl shadow-2xl cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              onScroll={checkArrows}
              className="overflow-x-auto scrollbar-hide scroll-smooth px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-3 px-8">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      shrink-0 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm
                      flex items-center gap-2 shadow-lg cursor-pointer
                      ${selectedCategory === category.id
                        ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-red-600/50 scale-105'
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50'
                      }
                    `}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-linear-to-l from-gray-900 to-transparent hover:from-gray-800 text-white p-3 rounded-l-xl shadow-2xl cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Search Results Header */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-white">
            Search Results for &ldquo;{searchQuery}&rdquo;
          </h2>
          <p className="text-gray-400 mt-1">{movies.length} movies found</p>
        </motion.div>
      )}

      {/* Loading State with Skeletons */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      )}

      {/* Movies Grid */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
        >
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </motion.div>
      )}

      {/* No Results */}
      {!loading && movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">No movies found</p>
          {searchQuery && (
            <p className="text-gray-500 mt-2">Try a different search term</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && movies.length > 0 && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center gap-2 mt-12"
        >
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all cursor-pointer"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${currentPage === pageNum
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all cursor-pointer"
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  );
}
