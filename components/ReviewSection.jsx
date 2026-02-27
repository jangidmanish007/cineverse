"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getMovieReviews,
  addReview,
  voteOnReview,
  getUserProfile,
  getAverageRating
} from "@/lib/reviews";

export default function ReviewSection({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    loadReviews();
    loadUserProfile();
  }, [movieId]);

  const loadReviews = () => {
    const movieReviews = getMovieReviews(movieId);
    setReviews(movieReviews.sort((a, b) => b.helpful - a.helpful));
    setAvgRating(getAverageRating(movieId));
  };

  const loadUserProfile = () => {
    let profile = getUserProfile();
    if (!profile) {
      profile = {
        id: Date.now(),
        name: "Movie Fan",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
      };
    }
    setUserProfile(profile);
  };

  const handleSubmitReview = () => {
    if (!rating || !reviewText.trim()) {
      alert("Please provide both rating and review");
      return;
    }

    const review = {
      userId: userProfile.id,
      userName: userProfile.name,
      userAvatar: userProfile.avatar,
      rating,
      text: reviewText
    };

    addReview(movieId, review);
    setReviewText("");
    setRating(0);
    setShowReviewForm(false);
    loadReviews();
  };

  const handleVote = (reviewId, isHelpful) => {
    if (userProfile) {
      voteOnReview(movieId, reviewId, isHelpful, userProfile.id);
      loadReviews();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Reviews</h2>
          <p className="text-gray-400 mt-1">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            {avgRating > 0 && ` • ${avgRating} average rating`}
          </p>
        </div>
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-red-600 hover:bg-red-700 gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Write Review
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Share Your Thoughts</h3>

            {/* Star Rating */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block text-white">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${star <= (hoveredStar || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block text-white">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you think about this movie?"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleSubmitReview}
                className="bg-red-600 hover:bg-red-700 gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Review
              </Button>
              <Button
                onClick={() => setShowReviewForm(false)}
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No reviews yet. Be the first to review!</p>
          </Card>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-white">{review.userName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-600'
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{review.text}</p>

                    {/* Helpful Votes */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">Was this helpful?</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVote(review.id, true)}
                          className="gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {review.helpful}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVote(review.id, false)}
                          className="gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          {review.notHelpful}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
