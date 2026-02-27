// Watchlist Management with localStorage
const WATCHLIST_KEY = 'movieflix_watchlist';

export const getWatchlist = () => {
  if (typeof window === 'undefined') return [];
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error('Error reading watchlist:', error);
    return [];
  }
};

export const addToWatchlist = (movie) => {
  try {
    const watchlist = getWatchlist();
    const exists = watchlist.find(m => m.id === movie.id);
    if (!exists) {
      const newWatchlist = [...watchlist, { ...movie, addedAt: Date.now() }];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
      window.dispatchEvent(new Event('watchlistUpdated'));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
};

export const removeFromWatchlist = (movieId) => {
  try {
    const watchlist = getWatchlist();
    const newWatchlist = watchlist.filter(m => m.id !== movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
    window.dispatchEvent(new Event('watchlistUpdated'));
    return true;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
};

export const isInWatchlist = (movieId) => {
  const watchlist = getWatchlist();
  return watchlist.some(m => m.id === movieId);
};

export const clearWatchlist = () => {
  try {
    localStorage.removeItem(WATCHLIST_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing watchlist:', error);
    return false;
  }
};
