"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import AdvancedFilters from "@/components/AdvancedFilters";
import { getMoviesByCategory, searchMovies, discoverMovies } from "@/lib/api";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genres: [],
    sortBy: "popularity.desc",
    yearRange: null,
    minRating: 0
  });

  // Load movies when category, page, or filters change
  useEffect(() => {
    if (!searchQuery) {
      loadMovies();
    }
  }, [selectedCategory, currentPage, filters]);

  // Search movies when query changes
  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      loadMovies();
    }
  }, [searchQuery, currentPage]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use advanced filters if genres are selected
      if (filters.genres.length > 0) {
        const data = await discoverMovies({
          genres: filters.genres,
          sortBy: filters.sortBy,
          page: currentPage
        });

        // Apply client-side filters
        let filteredMovies = data.results || [];

        // Filter by year range
        if (filters.yearRange) {
          filteredMovies = filteredMovies.filter(movie => {
            const year = parseInt(movie.year);
            return year >= filters.yearRange.min && year <= filters.yearRange.max;
          });
        }

        // Filter by minimum rating
        if (filters.minRating > 0) {
          filteredMovies = filteredMovies.filter(movie => {
            return parseFloat(movie.rating) >= filters.minRating;
          });
        }

        setMovies(filteredMovies);
        setTotalPages(data.totalPages || 1);
      } else {
        const data = await getMoviesByCategory(selectedCategory, currentPage);
        setMovies(data.results || data);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(searchQuery, currentPage);
      setMovies(data.results || data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && movies.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar onSearch={setSearchQuery} />
      <Hero />
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-600/20 border border-red-600 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}
      {/* Advanced Filters - Hidden for now */}
      {/* <div className="container mx-auto px-4">
        <AdvancedFilters filters={filters} onFilterChange={setFilters} />
      </div> */}
      <MovieGrid
        movies={movies}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
