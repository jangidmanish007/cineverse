# MovieFlix - Premium Video Platform

A modern, full-featured video streaming and download platform built with Next.js 15, Tailwind CSS, and shadcn/ui.

## ✨ New Features (v3.0)

### 🎯 Latest Updates!

- 🎥 **Movie Trailers Gallery** - Watch trailers, teasers, clips, and behind-the-scenes content
- 🎮 **Movie Quiz & Trivia** - Test your knowledge with daily quizzes, earn badges, compete on leaderboard

## ✨ Previous Features (v2.0)

### 🎯 Just Added!

- ⭐ **User Reviews & Ratings** - Write reviews, rate movies, vote on reviews
- 🎨 **Advanced Filters** - Sort by popularity, rating, date + filter by genre, year, rating
- ✨ **Personalized Recommendations** - Smart suggestions based on your taste
- 👥 **Social Features** - Add friends, share watchlists, activity feed

## Features

### Core Features

- 🎬 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🎯 **Category Filtering** - Browse by English, Hindi, Hindi Dubbed, and more
- 🔍 **Search Functionality** - Find movies quickly with real-time search
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Framer Motion Animations** - Smooth, professional animations throughout
- 💾 **Multiple Quality Options** - Download in 4K, 1080p, or 720p
- 🔐 **Authentication Pages** - Login and signup functionality
- 📄 **Movie Detail Pages** - Comprehensive movie information and actions
- ⚡ **Fast Performance** - Built with Next.js 15 for optimal speed

### New Features (v3.0)

- 🎥 **Movie Trailers Gallery**
  - Multiple video types (trailers, teasers, clips, BTS)
  - Beautiful grid layout with thumbnails
  - Full-screen video player modal
  - Video navigation (next/previous)
  - Color-coded type badges
  - Smooth animations

- 🎮 **Movie Quiz & Trivia**
  - Daily quiz challenges
  - Multiple difficulty levels (Easy/Medium/Hard)
  - 8+ categories (Awards, Directors, Actors, Marvel, Bollywood, etc.)
  - Points and scoring system
  - Badge achievements
  - Leaderboard rankings
  - Stats tracking
  - 30-second timer per question

### New Features (v2.0)

- ⭐ **Reviews & Ratings System**
  - Write detailed reviews with 5-star ratings
  - Vote on reviews (helpful/not helpful)
  - Auto-generated user profiles
  - Average rating calculation
  - Sort by helpfulness

- 🎨 **Advanced Filters & Sort**
  - 6 sort options (Popular, Rated, Date, A-Z)
  - 10 genre filters with multi-select
  - Year range filtering (by decade)
  - Minimum rating threshold
  - Active filter count badge

- ✨ **Personalized Recommendations**
  - Smart recommendation algorithm
  - User stats dashboard
  - Favorite genres detection
  - Watch history tracking
  - Three tabs: Recommended, History, Watchlist

- 👥 **Social Features**
  - Add/remove friends
  - Share watchlists with friends
  - Activity feed
  - Auto-generated avatars
  - Multi-friend selection

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: JavaScript (no TypeScript)

## Getting Started

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### 🚀 Try New Features (v3.0)

1. **Trailers**: Visit any movie → Scroll to "Trailers & Videos" → Click to watch
2. **Quiz**: Click "Quiz" in navbar → Choose mode → Start playing

### 🚀 Try Features (v2.0)

1. **Reviews**: Visit any movie → Write a review → Vote on reviews
2. **Filters**: Home page → Click "Advanced Filters" → Select options
3. **Recommendations**: Add movies to watchlist → Visit `/discover`
4. **Social**: Go to `/discover` → Add friends → Share watchlist

### 📚 Documentation

- **Quick Start**: See `QUICK_START.md` for 60-second guide
- **Features**: See `FEATURES.md` for detailed feature list
- **Usage Guide**: See `USAGE_GUIDE.md` for complete user guide
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md` for technical details

### Installation

1. Navigate to the project directory:

```bash
cd movie-platform
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
movie-platform/
├── app/
│   ├── auth/
│   │   └── page.js          # Authentication page
│   ├── movie/
│   │   └── [id]/
│   │       └── page.js      # Movie detail page (+ reviews + trailers)
│   ├── discover/
│   │   └── page.js          # Recommendations & social
│   ├── quiz/
│   │   └── page.js          # NEW: Quiz & trivia page
│   ├── watchlist/
│   │   └── page.js          # Watchlist page
│   ├── layout.js            # Root layout
│   ├── page.js              # Home page (+ advanced filters)
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── Hero.jsx             # Hero section
│   ├── Navbar.jsx           # Navigation bar (+ Quiz link)
│   ├── MovieGrid.jsx        # Movie grid with filters
│   ├── MovieCard.jsx        # Individual movie card
│   ├── Footer.jsx           # Footer component
│   ├── TrailerGallery.jsx   # NEW: Trailer gallery
│   ├── MovieQuiz.jsx        # NEW: Quiz component
│   ├── ReviewSection.jsx    # Review system
│   ├── AdvancedFilters.jsx  # Advanced filtering
│   ├── RecommendationsSection.jsx  # Recommendations
│   └── SocialPanel.jsx      # Social features
├── lib/
│   ├── moviesData.js        # Movie data
│   ├── api.js               # API integration
│   ├── watchlist.js         # Watchlist management
│   ├── quiz.js              # NEW: Quiz system
│   ├── reviews.js           # Review system
│   ├── recommendations.js   # Recommendation engine
│   ├── social.js            # Social features
│   └── utils.js             # Utility functions
├── docs/
│   ├── FEATURES.md          # Feature documentation
│   ├── NEW_FEATURES_V3.md   # NEW: v3.0 features
│   ├── USAGE_GUIDE.md       # User guide
│   ├── QUICK_START.md       # Quick start guide
│   └── IMPLEMENTATION_SUMMARY.md  # Technical details
└── public/                  # Static assets
```

## Features Breakdown

### Home Page

- Hero section with featured content
- **NEW**: Advanced filters (sort, genre, year, rating)
- Category tabs for filtering
- Grid layout of movie cards
- Search functionality
- Responsive navigation

### Movie Detail Page

- Full movie information
- Quality selection (4K, 1080p, 720p)
- Watch and download buttons
- **NEW (v3.0)**: Trailers & Videos gallery
- **v2.0**: Reviews & ratings section
- **v2.0**: Write reviews with star ratings
- **v2.0**: Vote on reviews (helpful/not helpful)
- **v2.0**: Auto-tracked watch history
- Related movies section
- Responsive design

### Quiz Page (NEW v3.0)

- **Daily Quiz**: Same questions for everyone each day
- **Quick Play**: Choose difficulty (Easy/Medium/Hard)
- **Category Quiz**: 8+ categories to choose from
- **Stats Dashboard**: Track your progress
- **Leaderboard**: Compete with other players
- **Badges**: Earn achievements
- **Timer**: 30 seconds per question
- **Score System**: Points based on difficulty

### Discover Page (NEW)

- **Personalized recommendations** based on your taste
- **User stats dashboard** (watchlist, history, genres)
- **Favorite genres** auto-detection
- **Three tabs**: Recommended, History, Watchlist
- **Social panel**: Add friends, share watchlists
- **Activity feed**: See what friends are watching

### Watchlist Page

- View all saved movies
- Remove movies from watchlist
- Clear all functionality
- Real-time sync across tabs

### Authentication

- Login and signup forms
- Form validation
- Modern UI with animations
- Remember me functionality

### Movie Cards

- Hover animations
- Quick action buttons
- Rating display
- Quality badges
- Category labels
- **NEW**: Watchlist heart icon

## Customization

### Adding Movies

Edit `lib/moviesData.js` to add or modify movies:

```javascript
{
  id: 1,
  title: "Movie Title",
  category: "english", // english, hindi, hindi-dubbed
  language: "English",
  year: "2024",
  rating: "8.5",
  duration: "2h 30m",
  image: "image-url",
  description: "Movie description"
}
```

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind classes in components

### Colors

The platform uses a dark theme with red accents. To change colors, modify:

- Primary color: `bg-red-600` → `bg-[your-color]`
- Gradients: Update in components

## API Integration

The platform uses **TMDB API** for movie data:

- Popular movies
- Top rated movies
- Trending movies
- Search functionality
- Movie details with cast
- Similar movies
- Discover with filters

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)

### Local Storage

User data is stored locally:

- `movieflix_watchlist` - Saved movies
- `movieflix_reviews` - User reviews
- `movieflix_watch_history` - Recently viewed
- `movieflix_friends` - Friends list
- `movieflix_shared_lists` - Shared watchlists
- `movieflix_activities` - Activity feed
- `movieflix_user_profile` - User profile
- `movieflix_quiz_stats` - Quiz statistics and badges (NEW v3.0)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm start
```

## Performance Optimization

- Images are optimized with Next.js Image component (can be added)
- Code splitting with Next.js App Router
- Lazy loading for components
- Optimized animations with Framer Motion

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ❌ IE11 (not supported)

## What's New in v3.0

### Added

- 🎥 Movie trailers gallery with multiple video types
- 🎮 Quiz & trivia system with daily challenges
- 🏆 Badge achievement system
- 📊 Quiz stats and leaderboard
- 🎯 Multiple quiz categories and difficulties
- ⏱️ Timed quiz questions
- 🎬 Video player modal with navigation

### Improved

- Enhanced movie detail pages with trailer gallery
- Better video content organization
- More interactive user engagement
- Gamification elements

### Technical

- 3 new files created
- 2 files modified
- ~800 lines of new code
- Full quiz system implementation
- Video gallery with YouTube integration

## What's New in v2.0

### Added

- ⭐ User reviews and ratings system
- 🎨 Advanced filters with multiple options
- ✨ Personalized recommendations engine
- 👥 Social features (friends, sharing, activity)
- 📊 User stats dashboard
- 📺 Watch history tracking
- 🎯 Favorite genres detection
- 💬 Review voting system

### Improved

- Enhanced movie detail pages
- Better filtering capabilities
- Improved user experience
- More interactive features
- Real-time updates

### Technical

- 13 new files created
- 4 files modified
- ~1,270 lines of new code
- Comprehensive documentation
- Production-ready code

## Screenshots

### Home Page with Advanced Filters

- Browse movies with powerful filtering
- Sort by popularity, rating, date
- Filter by genre, year, rating threshold

### Movie Detail with Trailers & Reviews (v3.0)

- Watch all trailers and videos in gallery
- Write and read reviews
- 5-star rating system
- Vote on helpful reviews
- See average ratings

### Quiz Page (v3.0)

- Daily quiz challenges
- Multiple difficulty levels
- Category-based quizzes
- Stats and leaderboard
- Badge achievements

### Discover Page

- Personalized recommendations
- User stats dashboard
- Social features panel
- Activity feed

### Watchlist

- Manage saved movies
- Quick access to favorites
- Real-time sync

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Roadmap

### Future Enhancements

- [ ] Backend integration
- [ ] User authentication
- [ ] Real-time social features
- [ ] Movie discussions
- [ ] Collections/Playlists
- [ ] Watch together feature
- [ ] Theme toggle
- [ ] Mobile app

## Changelog

### v3.0.0 (Current)

- Added movie trailers gallery
- Added quiz & trivia system
- Added badge achievements
- Added leaderboard
- Added quiz stats tracking
- Improved movie detail pages
- Added video player modal

### v2.0.0

- Added user reviews and ratings
- Added advanced filters and sort
- Added personalized recommendations
- Added social features
- Improved UI/UX
- Added comprehensive documentation

### v1.0.0

- Initial release
- Basic movie browsing
- Search functionality
- Movie details
- Watchlist feature

## License

This project is for educational and legitimate content distribution purposes only.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using Next.js and modern web technologies
