// TMDB API Integration
// Get your free API key from: https://www.themoviedb.org/settings/api

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '811a7b017e307240a2dabbddf50ce3ec'; // Demo key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Get image URL with proper size
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get popular movies
export async function getPopularMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=en-US&append_to_response=videos`
    );
    const data = await response.json();
    return data.results.map(transformMovie);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}

// Get top rated movies
export async function getTopRatedMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=en-US`
    );
    const data = await response.json();
    return data.results.map(transformMovie);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

// Get trending movies
export async function getTrendingMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    return data.results.map(transformMovie);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

// Search movies with pagination
export async function searchMovies(query, page = 1) {
  if (!query) return { results: [], page: 1, totalPages: 1, totalResults: 0 };

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`
    );
    const data = await response.json();
    return {
      results: data.results.map(transformMovie),
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], page: 1, totalPages: 1, totalResults: 0 };
  }
}

// Get movie details
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,similar&language=en-US`
    );
    const data = await response.json();
    return transformMovieDetails(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// Get movies by genre
export async function getMoviesByGenre(genreId, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&language=en-US&sort_by=popularity.desc`
    );
    const data = await response.json();
    return data.results.map(transformMovie);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
}

// Discover movies with filters
export async function discoverMovies({ genres = [], sortBy = 'popularity.desc', page = 1 }) {
  try {
    const genreParam = genres.length > 0 ? `&with_genres=${genres.join(',')}` : '';
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}${genreParam}&sort_by=${sortBy}&page=${page}&language=en-US`
    );
    const data = await response.json();
    return {
      results: data.results.map(transformMovie),
      page: data.page,
      totalPages: Math.min(data.total_pages, 500),
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error('Error discovering movies:', error);
    return { results: [], page: 1, totalPages: 1, totalResults: 0 };
  }
}

// Get movies by region/language
export async function getMoviesByRegion(region, page = 1) {
  try {
    const regionMap = {
      hindi: 'hi',
      tamil: 'ta',
      kdrama: 'ko',
    };

    const language = regionMap[region];
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${language}&page=${page}&sort_by=popularity.desc`
    );
    const data = await response.json();
    return {
      results: data.results.map(transformMovie),
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error('Error fetching movies by region:', error);
    return { results: [], page: 1, totalPages: 1, totalResults: 0 };
  }
}

// Get movies by category with pagination info
export async function getMoviesByCategory(category, page = 1) {
  // Handle regional categories
  if (['hindi', 'tamil', 'kdrama'].includes(category)) {
    return getMoviesByRegion(category, page);
  }

  const categoryMap = {
    all: () => getPopularMovies(page),
    popular: () => getPopularMovies(page),
    'top-rated': () => getTopRatedMovies(page),
    trending: () => getTrendingMovies(page),
    action: () => getMoviesByGenre(28, page),
    comedy: () => getMoviesByGenre(35, page),
    drama: () => getMoviesByGenre(18, page),
    thriller: () => getMoviesByGenre(53, page),
    horror: () => getMoviesByGenre(27, page),
    romance: () => getMoviesByGenre(10749, page),
  };

  const fetchFunction = categoryMap[category] || categoryMap.all;
  const results = await fetchFunction();

  // Return with pagination info for consistency
  return {
    results: results,
    page: page,
    totalPages: 20,
    totalResults: results.length,
  };
}

// Transform TMDB movie to our format
function transformMovie(tmdbMovie) {
  // Get trailer from videos if available
  const trailer = tmdbMovie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  ) || tmdbMovie.videos?.results?.[0];

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    category: getCategory(tmdbMovie.genre_ids),
    language: tmdbMovie.original_language === 'hi' ? 'Hindi' : 'English',
    year: tmdbMovie.release_date?.split('-')[0] || 'N/A',
    rating: tmdbMovie.vote_average?.toFixed(1) || 'N/A',
    duration: 'N/A', // Need details API for runtime
    image: getImageUrl(tmdbMovie.poster_path),
    backdrop: getImageUrl(tmdbMovie.backdrop_path, 'original'),
    description: tmdbMovie.overview || 'No description available',
    trailer: trailer ? {
      key: trailer.key,
      name: trailer.name,
      site: trailer.site,
      type: trailer.type,
    } : null,
  };
}

// Get download URL - redirects to legal streaming/rental services
function getDownloadUrl(movieId, title, year) {
  // Instead of direct downloads, redirect to legal streaming services
  // where users can rent/buy or watch for free

  // Option 1: Redirect to JustWatch (shows where to legally watch)
  const cleanTitle = encodeURIComponent(title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '');
  return `https://www.justwatch.com/us/search?q=${encodeURIComponent(title)}`;

  // Option 2: Redirect to TMDB page (has streaming links)
  // return `https://www.themoviedb.org/movie/${movieId}`;

  // Option 3: Redirect to Google search for legal options
  // return `https://www.google.com/search?q=watch+${encodeURIComponent(title)}+${year}+online+legal`;

  // Option 4: Redirect to YouTube search (some movies are free there)
  // return `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}+${year}+full+movie`;
}

// Transform detailed movie data
function transformMovieDetails(data) {
  // Get trailer from videos
  const trailer = data.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  ) || data.videos?.results?.[0]; // Fallback to first video if no trailer

  return {
    id: data.id,
    title: data.title,
    category: data.genres?.[0]?.name || 'Unknown',
    language: data.original_language === 'hi' ? 'Hindi' : 'English',
    year: data.release_date?.split('-')[0] || 'N/A',
    rating: data.vote_average?.toFixed(1) || 'N/A',
    duration: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : 'N/A',
    image: getImageUrl(data.poster_path),
    backdrop: getImageUrl(data.backdrop_path, 'original'),
    description: data.overview || 'No description available',
    genres: data.genres || [],
    videos: data.videos?.results || [],
    trailer: trailer ? {
      key: trailer.key,
      name: trailer.name,
      site: trailer.site,
      type: trailer.type,
    } : null,
    cast: data.credits?.cast?.slice(0, 10) || [],
    similar: data.similar?.results?.slice(0, 8).map(transformMovie) || [],
    downloadUrl: getDownloadUrl(data.id, data.title, data.release_date?.split('-')[0]),
  };
}

// Get category from genre IDs
function getCategory(genreIds = []) {
  const genreMap = {
    28: 'action',
    12: 'adventure',
    16: 'animation',
    35: 'comedy',
    80: 'crime',
    99: 'documentary',
    18: 'drama',
    10751: 'family',
    14: 'fantasy',
    36: 'history',
    27: 'horror',
    10402: 'music',
    9648: 'mystery',
    10749: 'romance',
    878: 'sci-fi',
    10770: 'tv-movie',
    53: 'thriller',
    10752: 'war',
    37: 'western',
  };

  if (genreIds.length === 0) return 'english';
  return genreMap[genreIds[0]] || 'english';
}

const apiExports = {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMoviesByGenre,
  getMoviesByCategory,
  getMoviesByRegion,
  discoverMovies,
  getImageUrl,
};

export default apiExports;
