"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Clock, CheckCircle, XCircle, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getRandomQuiz,
  getDailyQuiz,
  calculateScore,
  updateQuizStats,
  getBadgeInfo,
} from "@/lib/quiz";

export default function MovieQuiz({ mode = "random", difficulty = null, category = null, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [result, setResult] = useState(null);

  const loadQuiz = useCallback(() => {
    const quizQuestions = mode === "daily"
      ? getDailyQuiz()
      : getRandomQuiz(10, difficulty, category === "all" ? null : category);
    setQuestions(quizQuestions);
  }, [mode, difficulty, category]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  const finishQuiz = useCallback((finalAnswers) => {
    const { score, correct, wrong } = calculateScore(finalAnswers, questions);
    const stats = updateQuizStats(score, correct, wrong);

    setResult({
      score,
      correct,
      wrong,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      stats,
    });
    setShowResult(true);
  }, [questions]);

  const handleNextQuestion = useCallback(() => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      finishQuiz(newAnswers);
    }
  }, [answers, selectedAnswer, currentQuestion, questions.length, finishQuiz]);

  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, showResult, handleNextQuestion]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
    setTimeLeft(30);
    loadQuiz();
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading quiz...</p>
      </div>
    );
  }

  // Start Screen
  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="bg-linear-to-br from-red-600 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">
          {mode === "daily" ? "Daily Quiz" : "Movie Trivia"}
        </h2>
        <p className="text-gray-300 mb-6">
          Test your movie knowledge with {questions.length} questions
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Badge variant="outline" className="border-gray-400 text-gray-200 bg-gray-800/50">
            {questions.length} Questions
          </Badge>
          <Badge variant="outline" className="border-gray-400 text-gray-200 bg-gray-800/50">
            30s per question
          </Badge>
          <Badge variant="outline" className="border-gray-400 text-gray-200 bg-gray-800/50">
            {questions.reduce((sum, q) => sum + q.points, 0)} Total Points
          </Badge>
        </div>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 gap-2 text-white"
          onClick={startQuiz}
        >
          <Play className="w-5 h-5" />
          Start Quiz
        </Button>
      </motion.div>
    );
  }

  // Result Screen
  if (showResult && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${result.percentage >= 80 ? 'bg-linear-to-br from-green-600 to-emerald-600' :
          result.percentage >= 60 ? 'bg-linear-to-br from-yellow-600 to-orange-600' :
            'bg-linear-to-br from-red-600 to-pink-600'
          }`}>
          <Trophy className="w-12 h-12 text-white" />
        </div>

        <h2 className="text-4xl font-bold mb-2 text-white">Quiz Complete!</h2>
        <p className="text-2xl text-red-500 font-bold mb-6">{result.score} Points</p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <Card className="bg-gray-700/50 border-gray-600 p-4 backdrop-blur-sm">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{result.correct}</p>
            <p className="text-sm text-gray-300">Correct</p>
          </Card>
          <Card className="bg-gray-700/50 border-gray-600 p-4 backdrop-blur-sm">
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{result.wrong}</p>
            <p className="text-sm text-gray-300">Wrong</p>
          </Card>
          <Card className="bg-gray-700/50 border-gray-600 p-4 backdrop-blur-sm">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{result.percentage}%</p>
            <p className="text-sm text-gray-300">Accuracy</p>
          </Card>
        </div>

        {/* New Badges */}
        {result.stats.badges.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-white">Your Badges</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {result.stats.badges.slice(-3).map(badgeId => {
                const badge = getBadgeInfo(badgeId);
                return (
                  <Badge key={badgeId} className="bg-yellow-500 text-gray-900 px-3 py-1 font-semibold">
                    {badge.icon} {badge.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 gap-2 text-white"
            onClick={restartQuiz}
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </Button>
          {onClose && (
            <Button
              size="lg"
              variant="outline"
              className="border-gray-500 text-white hover:bg-gray-700 bg-gray-800/50"
              onClick={onClose}
            >
              Close
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  // Quiz Question Screen
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300 font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-300" />
            <span className={`text-sm font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-gray-300'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-linear-to-r from-red-600 to-orange-600"
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="space-y-6"
        >
          <Card className="bg-gray-800/80 border-gray-600 p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-start gap-3 mb-4">
              <Badge className="bg-red-600 text-white font-semibold">
                {question.points} pts
              </Badge>
              <Badge variant="outline" className="border-gray-500 text-gray-200 bg-gray-700/50 font-medium">
                {question.difficulty}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed">{question.question}</h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showAnswer = selectedAnswer !== null;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                    whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-lg text-left transition-all ${showAnswer
                      ? isCorrect
                        ? 'bg-green-600 border-green-500 shadow-lg shadow-green-500/30'
                        : isSelected
                          ? 'bg-red-600 border-red-500 shadow-lg shadow-red-500/30'
                          : 'bg-gray-600/50 border-gray-500 opacity-60'
                      : isSelected
                        ? 'bg-red-600 border-red-500 shadow-lg shadow-red-500/30'
                        : 'bg-gray-700/70 border-gray-500 hover:bg-gray-600/70 hover:border-gray-400'
                      } border-2`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-base">{option}</span>
                      {showAnswer && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                      {showAnswer && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Card>

          {/* Next Button */}
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg"
                onClick={handleNextQuestion}
              >
                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
