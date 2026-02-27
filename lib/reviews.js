// User Reviews & Ratings Management
const REVIEWS_KEY = 'movieflix_reviews';
const USER_PROFILE_KEY = 'movieflix_user_profile';

// Get user profile
export const getUserProfile = () => {
  if (typeof window === 'undefined') return null;
  try {
    const profile = localStorage.getItem(USER_PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error reading user profile:', error);
    return null;
  }
};

// Set user profile
export const setUserProfile = (profile) => {
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

// Get all reviews
export const getAllReviews = () => {
  if (typeof window === 'undefined') return {};
  try {
    const reviews = localStorage.getItem(REVIEWS_KEY);
    return reviews ? JSON.parse(reviews) : {};
  } catch (error) {
    console.error('Error reading reviews:', error);
    return {};
  }
};

// Get reviews for a specific movie
export const getMovieReviews = (movieId) => {
  const allReviews = getAllReviews();
  return allReviews[movieId] || [];
};

// Add a review
export const addReview = (movieId, review) => {
  try {
    const allReviews = getAllReviews();
    const movieReviews = allReviews[movieId] || [];

    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: Date.now(),
      helpful: 0,
      notHelpful: 0,
      votedBy: []
    };

    movieReviews.push(newReview);
    allReviews[movieId] = movieReviews;

    localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
    window.dispatchEvent(new Event('reviewsUpdated'));
    return newReview;
  } catch (error) {
    console.error('Error adding review:', error);
    return null;
  }
};

// Vote on review (helpful/not helpful)
export const voteOnReview = (movieId, reviewId, isHelpful, userId) => {
  try {
    const allReviews = getAllReviews();
    const movieReviews = allReviews[movieId] || [];

    const reviewIndex = movieReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) return false;

    const review = movieReviews[reviewIndex];

    // Check if user already voted
    if (review.votedBy.includes(userId)) return false;

    if (isHelpful) {
      review.helpful++;
    } else {
      review.notHelpful++;
    }

    review.votedBy.push(userId);
    allReviews[movieId] = movieReviews;

    localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
    window.dispatchEvent(new Event('reviewsUpdated'));
    return true;
  } catch (error) {
    console.error('Error voting on review:', error);
    return false;
  }
};

// Get user's rating for a movie
export const getUserRating = (movieId, userId) => {
  const reviews = getMovieReviews(movieId);
  const userReview = reviews.find(r => r.userId === userId);
  return userReview?.rating || 0;
};

// Calculate average rating
export const getAverageRating = (movieId) => {
  const reviews = getMovieReviews(movieId);
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};
