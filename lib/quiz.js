// Movie Quiz & Trivia System

// Quiz questions database
const quizQuestions = [
  {
    id: 1,
    question: "Which movie won the Oscar for Best Picture in 2020?",
    options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    correct: 2,
    difficulty: "medium",
    category: "awards",
    points: 10,
  },
  {
    id: 2,
    question: "Who directed 'The Dark Knight' trilogy?",
    options: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"],
    correct: 1,
    difficulty: "easy",
    category: "directors",
    points: 5,
  },
  {
    id: 3,
    question: "In which year was the first 'Avengers' movie released?",
    options: ["2010", "2011", "2012", "2013"],
    correct: 2,
    difficulty: "easy",
    category: "marvel",
    points: 5,
  },
  {
    id: 4,
    question: "Which actor played the Joker in 'The Dark Knight'?",
    options: ["Jared Leto", "Joaquin Phoenix", "Heath Ledger", "Jack Nicholson"],
    correct: 2,
    difficulty: "easy",
    category: "actors",
    points: 5,
  },
  {
    id: 5,
    question: "What is the highest-grossing film of all time (not adjusted for inflation)?",
    options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
    correct: 1,
    difficulty: "medium",
    category: "box-office",
    points: 10,
  },
  {
    id: 6,
    question: "Which movie features the line 'I'll be back'?",
    options: ["Die Hard", "The Terminator", "Predator", "RoboCop"],
    correct: 1,
    difficulty: "easy",
    category: "quotes",
    points: 5,
  },
  {
    id: 7,
    question: "Who composed the music for 'Inception'?",
    options: ["John Williams", "Hans Zimmer", "Ennio Morricone", "Howard Shore"],
    correct: 1,
    difficulty: "medium",
    category: "music",
    points: 10,
  },
  {
    id: 8,
    question: "Which Bollywood movie is the highest-grossing Indian film worldwide?",
    options: ["Dangal", "Baahubali 2", "PK", "3 Idiots"],
    correct: 0,
    difficulty: "medium",
    category: "bollywood",
    points: 10,
  },
  {
    id: 9,
    question: "How many Infinity Stones are there in the Marvel Cinematic Universe?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    difficulty: "easy",
    category: "marvel",
    points: 5,
  },
  {
    id: 10,
    question: "Which movie won the most Oscars in a single year (11 awards)?",
    options: ["Titanic", "Ben-Hur", "The Lord of the Rings: The Return of the King", "All of the above"],
    correct: 3,
    difficulty: "hard",
    category: "awards",
    points: 15,
  },
];

// Get user quiz stats from localStorage
export function getQuizStats() {
  if (typeof window === 'undefined') return null;

  const stats = localStorage.getItem('movieflix_quiz_stats');
  return stats ? JSON.parse(stats) : {
    totalQuizzes: 0,
    totalScore: 0,
    highScore: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    badges: [],
    lastPlayed: null,
  };
}

// Save quiz stats
export function saveQuizStats(stats) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('movieflix_quiz_stats', JSON.stringify(stats));
}

// Get random quiz questions
export function getRandomQuiz(count = 10, difficulty = null, category = null) {
  let filtered = [...quizQuestions];

  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }

  if (category) {
    filtered = filtered.filter(q => q.category === category);
  }

  // Shuffle and pick random questions
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get daily quiz (same questions for everyone on the same day)
export function getDailyQuiz() {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Use seed to get consistent random questions for the day
  const shuffled = [...quizQuestions].sort((a, b) => {
    return ((a.id + seed) % 100) - ((b.id + seed) % 100);
  });

  return shuffled.slice(0, 5);
}

// Check if daily quiz is completed today
export function isDailyQuizCompleted() {
  if (typeof window === 'undefined') return false;

  const stats = getQuizStats();
  if (!stats.lastPlayed) return false;

  const lastPlayed = new Date(stats.lastPlayed).toDateString();
  const today = new Date().toDateString();

  return lastPlayed === today;
}

// Calculate quiz score
export function calculateScore(answers, questions) {
  let score = 0;
  let correct = 0;
  let wrong = 0;

  answers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      score += questions[index].points;
      correct++;
    } else {
      wrong++;
    }
  });

  return { score, correct, wrong };
}

// Update stats after quiz completion
export function updateQuizStats(score, correct, wrong) {
  const stats = getQuizStats();

  stats.totalQuizzes++;
  stats.totalScore += score;
  stats.highScore = Math.max(stats.highScore, score);
  stats.correctAnswers += correct;
  stats.wrongAnswers += wrong;
  stats.lastPlayed = new Date().toISOString();

  // Award badges
  const newBadges = checkBadges(stats);
  stats.badges = [...new Set([...stats.badges, ...newBadges])];

  saveQuizStats(stats);
  return stats;
}

// Check and award badges
function checkBadges(stats) {
  const badges = [];

  if (stats.totalQuizzes >= 1) badges.push('first-quiz');
  if (stats.totalQuizzes >= 10) badges.push('quiz-master');
  if (stats.totalQuizzes >= 50) badges.push('quiz-legend');
  if (stats.highScore >= 50) badges.push('high-scorer');
  if (stats.highScore >= 100) badges.push('perfect-score');
  if (stats.correctAnswers >= 50) badges.push('knowledge-seeker');
  if (stats.correctAnswers >= 100) badges.push('movie-expert');

  return badges;
}

// Get badge info
export function getBadgeInfo(badgeId) {
  const badges = {
    'first-quiz': { name: 'First Quiz', icon: '🎬', description: 'Completed your first quiz' },
    'quiz-master': { name: 'Quiz Master', icon: '🏆', description: 'Completed 10 quizzes' },
    'quiz-legend': { name: 'Quiz Legend', icon: '👑', description: 'Completed 50 quizzes' },
    'high-scorer': { name: 'High Scorer', icon: '⭐', description: 'Scored 50+ points in a quiz' },
    'perfect-score': { name: 'Perfect Score', icon: '💯', description: 'Scored 100+ points in a quiz' },
    'knowledge-seeker': { name: 'Knowledge Seeker', icon: '📚', description: '50 correct answers' },
    'movie-expert': { name: 'Movie Expert', icon: '🎓', description: '100 correct answers' },
  };

  return badges[badgeId] || { name: 'Unknown', icon: '❓', description: 'Unknown badge' };
}

// Get leaderboard (mock data for demo)
export function getLeaderboard() {
  const currentUser = getQuizStats();

  return [
    { rank: 1, name: 'MovieBuff123', score: 1250, quizzes: 45 },
    { rank: 2, name: 'CinemaLover', score: 1180, quizzes: 42 },
    { rank: 3, name: 'FilmFanatic', score: 1050, quizzes: 38 },
    { rank: 4, name: 'You', score: currentUser.totalScore, quizzes: currentUser.totalQuizzes, isCurrentUser: true },
    { rank: 5, name: 'QuizMaster', score: 890, quizzes: 32 },
  ].sort((a, b) => b.score - a.score).map((user, index) => ({ ...user, rank: index + 1 }));
}

// Get all categories
export function getCategories() {
  return [
    { id: 'all', name: 'All Categories', icon: '🎬' },
    { id: 'awards', name: 'Awards', icon: '🏆' },
    { id: 'directors', name: 'Directors', icon: '🎥' },
    { id: 'actors', name: 'Actors', icon: '🎭' },
    { id: 'marvel', name: 'Marvel', icon: '🦸' },
    { id: 'bollywood', name: 'Bollywood', icon: '🇮🇳' },
    { id: 'quotes', name: 'Quotes', icon: '💬' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'box-office', name: 'Box Office', icon: '💰' },
  ];
}

const quizExports = {
  getQuizStats,
  saveQuizStats,
  getRandomQuiz,
  getDailyQuiz,
  isDailyQuizCompleted,
  calculateScore,
  updateQuizStats,
  getBadgeInfo,
  getLeaderboard,
  getCategories,
};

export default quizExports;
