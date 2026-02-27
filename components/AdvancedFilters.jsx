"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, SlidersHorizontal, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function AdvancedFilters({ onFilterChange, filters }) {
  const [showFilters, setShowFilters] = useState(false);

  const genres = [
    { id: 28, name: "Action", icon: "💥" },
    { id: 35, name: "Comedy", icon: "😂" },
    { id: 18, name: "Drama", icon: "🎭" },
    { id: 27, name: "Horror", icon: "👻" },
    { id: 10749, name: "Romance", icon: "💕" },
    { id: 878, name: "Sci-Fi", icon: "🚀" },
    { id: 53, name: "Thriller", icon: "😱" },
    { id: 16, name: "Animation", icon: "🎨" },
    { id: 12, name: "Adventure", icon: "🗺️" },
    { id: 14, name: "Fantasy", icon: "🧙" },
  ];

  const sortOptions = [
    { value: "popularity.desc", label: "Most Popular", icon: "🔥" },
    { value: "vote_average.desc", label: "Highest Rated", icon: "⭐" },
    { value: "release_date.desc", label: "Newest First", icon: "📅" },
    { value: "release_date.asc", label: "Oldest First", icon: "📜" },
    { value: "title.asc", label: "A-Z", icon: "🔤" },
    { value: "title.desc", label: "Z-A", icon: "🔡" },
  ];

  const yearRanges = [
    { label: "2024", value: { min: 2024, max: 2024 } },
    { label: "2020-2024", value: { min: 2020, max: 2024 } },
    { label: "2010-2019", value: { min: 2010, max: 2019 } },
    { label: "2000-2009", value: { min: 2000, max: 2009 } },
    { label: "1990-1999", value: { min: 1990, max: 1999 } },
    { label: "Before 1990", value: { min: 1900, max: 1989 } },
  ];

  const ratingRanges = [
    { label: "9+ Masterpiece", value: 9, icon: "🏆" },
    { label: "8+ Excellent", value: 8, icon: "⭐" },
    { label: "7+ Good", value: 7, icon: "👍" },
    { label: "6+ Decent", value: 6, icon: "👌" },
    { label: "All Ratings", value: 0, icon: "📊" },
  ];

  const toggleGenre = (genreId) => {
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter(id => id !== genreId)
      : [...filters.genres, genreId];
    onFilterChange({ ...filters, genres: newGenres });
  };

  const clearAllFilters = () => {
    onFilterChange({
      genres: [],
      sortBy: "popularity.desc",
      yearRange: null,
      minRating: 0
    });
  };

  const activeFiltersCount =
    filters.genres.length +
    (filters.yearRange ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="mb-8">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge className="bg-red-600 text-white ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            onClick={clearAllFilters}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white gap-2"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6 space-y-6">
              {/* Sort By */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-white">Sort By</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sortOptions.map((option) => (
                    <Badge
                      key={option.value}
                      onClick={() => onFilterChange({ ...filters, sortBy: option.value })}
                      className={`cursor-pointer transition-all justify-center py-2 ${filters.sortBy === option.value
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                    >
                      <span className="mr-1">{option.icon}</span>
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Genres */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-white">Genres</h3>
                  {filters.genres.length > 0 && (
                    <Badge className="bg-red-600 text-white text-xs">
                      {filters.genres.length} selected
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      onClick={() => toggleGenre(genre.id)}
                      className={`cursor-pointer transition-all ${filters.genres.includes(genre.id)
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                    >
                      <span className="mr-1">{genre.icon}</span>
                      {genre.name}
                      {filters.genres.includes(genre.id) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-white">Release Year</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {yearRanges.map((range) => (
                    <Badge
                      key={range.label}
                      onClick={() => onFilterChange({
                        ...filters,
                        yearRange: filters.yearRange?.min === range.value.min ? null : range.value
                      })}
                      className={`cursor-pointer transition-all justify-center py-2 ${filters.yearRange?.min === range.value.min
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                    >
                      {range.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-white">Minimum Rating</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ratingRanges.map((range) => (
                    <Badge
                      key={range.value}
                      onClick={() => onFilterChange({ ...filters, minRating: range.value })}
                      className={`cursor-pointer transition-all justify-center py-2 ${filters.minRating === range.value
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                    >
                      <span className="mr-1">{range.icon}</span>
                      {range.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
