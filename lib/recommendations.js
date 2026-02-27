// Personalized Recommendations Engine
import { getWatchlist } from './watchlist';
import { getAllReviews } from './reviews';

const WATCH_HISTORY_KEY = 'movieflix_watch_history';

// Get watch history
export const getWatchHistory = () => {
  if (typeof window === 'undefined') return [];
  try {
    const history = localStorage.getItem(WATCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading watch history:', error);
    return [];
  }
};

// Add to watch history
export const addToWatchHistory = (movie) => {
  try {
    const history = getWatchHistory();

    // Remove if already exists
    const filtered = history.filter(m => m.id !== movie.id);

    // Add to beginning with timestamp
    const newHistory = [{ ...movie, watchedAt: Date.now() }, ...filtered].slice(0, 50);

    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(newHistory));
    window.dispatchEvent(new Event('historyUpdated'));
    return true;
  } catch (error) {
    console.error('Error adding to watch history:', error);
    return false;
  }
};

// Get user preferences based on watchlist and history
export const getUserPreferences = () => {
  const watchlist = getWatchlist();
  const history = getWatchHistory();
  const allMovies = [...watchlist, ...history];

  // Extract genres
  const genreCount = {};
  allMovies.forEach(movie => {
    if (movie.category) {
      genreCount[movie.category] = (genreCount[movie.category] || 0) + 1;
    }
  });

  // Sort by frequency
  const sortedGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre);

  return {
    favoriteGenres: sortedGenres.slice(0, 3),
    totalWatched: history.length,
    totalWatchlist: watchlist.length
  };
};

// Generate recommendations based on a movie
export const getRecommendationsFor = (movie, allMovies) => {
  if (!movie || !allMovies || allMovies.length === 0) return [];

  return allMovies
    .filter(m => m.id !== movie.id)
    .filter(m => m.category === movie.category || m.language === movie.language)
    .slice(0, 8);
};

// Get personalized recommendations
export const getPersonalizedRecommendations = (allMovies) => {
  const preferences = getUserPreferences();
  const watchlist = getWatchlist();
  const history = getWatchHistory();

  // Get IDs of already watched/listed movies
  const seenIds = new Set([
    ...watchlist.map(m => m.id),
    ...history.map(m => m.id)
  ]);

  // Filter movies based on preferences
  return allMovies
    .filter(movie => !seenIds.has(movie.id))
    .filter(movie => preferences.favoriteGenres.includes(movie.category))
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 12);
};
