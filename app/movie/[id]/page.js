"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Download, Star, Clock, Calendar, Heart, Share2, ArrowLeft, Film } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import TrailerPlayer from "@/components/TrailerPlayer";
import TrailerGallery from "@/components/TrailerGallery";
import ReviewSection from "@/components/ReviewSection";
import { getMovieDetails } from "@/lib/api";
import { addToWatchHistory } from "@/lib/recommendations";

export default function MovieDetailPage() {
  const params = useParams();
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [searchQuery, setSearchQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadMovie();
  }, [params.id]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      const data = await getMovieDetails(params.id);
      setMovie(data);
      // Add to watch history
      if (data) {
        addToWatchHistory(data);
      }
    } catch (error) {
      console.error('Error loading movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Redirect to legal streaming services where users can watch/rent/buy
    if (movie.downloadUrl) {
      window.open(movie.downloadUrl, '_blank');
    } else {
      // Fallback: Search on JustWatch for legal streaming options
      const searchUrl = `https://www.justwatch.com/us/search?q=${encodeURIComponent(movie.title)}`;
      window.open(searchUrl, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <Loading />;

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar onSearch={setSearchQuery} />

      <div className="pt-16">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
            <div className="grid md:grid-cols-[300px_1fr] gap-8 w-full">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden md:block"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl border-4 border-gray-800"
                />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col justify-end"
              >
                <Link href="/">
                  <Button variant="ghost" className="mb-4 gap-2 text-white hover:text-white hover:bg-gray-800/50 w-fit">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-red-600 text-white font-semibold px-3 py-1">{movie.category}</Badge>
                  {movie.genres?.slice(0, 3).map(genre => (
                    <Badge key={genre.id} variant="outline" className="border-gray-500 text-gray-200 px-3 py-1">
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold text-yellow-400">{movie.rating}</span>
                    <span className="text-gray-300 text-sm">/10</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{movie.duration}</span>
                  </div>
                  <Badge variant="outline" className="border-gray-500 text-gray-200 px-3 py-1">
                    {movie.language}
                  </Badge>
                </div>

                <p className="text-lg text-gray-200 mb-6 leading-relaxed max-w-3xl line-clamp-3">
                  {movie.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {movie.trailer && (
                    <TrailerPlayer trailer={movie.trailer} movieTitle={movie.title} buttonVariant="hero" />
                  )}
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 gap-2 font-semibold shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Watch Now
                  </Button>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold shadow-lg"
                    onClick={handleDownload}
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={`border-gray-500 bg-gray-900 hover:bg-gray-800 backdrop-blur-sm ${isFavorite ? 'text-red-500 hover:text-red-400' : 'text-white hover:text-white'}`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-500 bg-gray-900 text-white hover:bg-gray-800 hover:text-white backdrop-blur-sm"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
              </motion.div>

              {/* Trailers & Videos */}
              {movie.videos && movie.videos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
                >
                  <h2 className="text-2xl font-bold mb-4 text-white">Trailers & Videos</h2>
                  <TrailerGallery videos={movie.videos} movieTitle={movie.title} />
                </motion.div>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
                >
                  <h2 className="text-2xl font-bold mb-4 text-white">Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movie.cast.slice(0, 8).map((actor) => (
                      <div key={actor.id} className="text-center">
                        <div className="aspect-square rounded-lg bg-gray-800 mb-2 overflow-hidden">
                          {actor.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                              alt={actor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                              <Film className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                        <p className="text-white font-medium text-sm">{actor.name}</p>
                        <p className="text-gray-400 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Reviews Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
              >
                <ReviewSection movieId={params.id} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Download Options */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-4 text-white">Download Options</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Select Quality</label>
                    <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="4k" className="text-white hover:bg-gray-700">
                          <div className="flex items-center justify-between w-full">
                            <span>4K Ultra HD</span>
                            <Badge className="ml-4 bg-red-600 text-white text-xs">Best</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="1080p" className="text-white hover:bg-gray-700">1080p Full HD</SelectItem>
                        <SelectItem value="720p" className="text-white hover:bg-gray-700">720p HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 gap-2 text-white font-semibold shadow-lg"
                    onClick={handleDownload}
                  >
                    <Download className="w-5 h-5" />
                    Download ({selectedQuality})
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="font-semibold mb-3 text-white">Available Formats</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-gray-600 text-gray-200">4K Ultra HD</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-200">1080p Full HD</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-200">720p HD</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-200">HDR</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-200">Dolby Atmos</Badge>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {movie.similar && movie.similar.length > 0 && (
          <div className="container mx-auto px-4 pb-16">
            <h3 className="text-3xl font-bold mb-6 text-white">More Like This</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movie.similar.map((relatedMovie, index) => (
                <MovieCard key={relatedMovie.id} movie={relatedMovie} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
