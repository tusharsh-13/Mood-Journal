import { WelcomeDoodle, QuoteBubble } from '@/assets/DoodleIllustration';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle, BookOpen, Sparkles } from 'lucide-react';

const dailyQuotes = [
  "Every day is a fresh start, embrace it with an open heart 🌸",
  "Your feelings are valid, honor them with kindness 💕",
  "Small steps forward are still progress 🌿",
  "Take a deep breath, you're doing better than you think ✨",
  "Today is a good day to check in with yourself 🦋",
  "Your mental health matters, treat it with care 🌺",
  "It's okay to feel whatever you're feeling right now 🌙"
];

const Home = () => {
  const todaysQuote = dailyQuotes[new Date().getDay()];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-handwriting text-primary mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-12 h-12 text-baby-pink" />
          Welcome to Your Mood Journal
          <Sparkles className="w-12 h-12 text-mint" />
        </h1>
        <p className="text-xl text-muted-foreground font-handwriting">
          A safe space to track your emotions and nurture your well-being
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Illustration */}
        <div className="doodle-card bg-gradient-to-br from-soft-yellow/30 to-mint/30">
          <WelcomeDoodle />
        </div>

        {/* Right Column - Actions & Quote */}
        <div className="space-y-6">
          {/* Today's Quote */}
          <QuoteBubble>
            <h3 className="text-lg font-handwriting text-primary mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Today's Inspiration
            </h3>
            <p className="text-foreground font-handwriting text-lg leading-relaxed">
              {todaysQuote}
            </p>
          </QuoteBubble>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link to="/add" className="block">
              <Button className="doodle-button w-full bg-baby-pink hover:bg-baby-pink/80 text-foreground border-2 border-primary/30">
                <PlusCircle className="w-6 h-6 mr-3" />
                How are you feeling today?
              </Button>
            </Link>

            <Link to="/journal" className="block">
              <Button className="doodle-button w-full bg-lavender hover:bg-lavender/80 text-foreground border-2 border-primary/30">
                <BookOpen className="w-6 h-6 mr-3" />
                Read your journal entries
              </Button>
            </Link>
          </div>

          {/* Stats Preview */}
          <div className="doodle-card bg-gradient-to-br from-sky-blue/30 to-lavender/30">
            <h3 className="text-lg font-handwriting text-primary mb-3">
              Your Journey So Far
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-handwriting text-primary">0</p>
                <p className="text-sm text-muted-foreground">Total Entries</p>
              </div>
              <div>
                <p className="text-2xl font-handwriting text-primary">0</p>
                <p className="text-sm text-muted-foreground">Days Tracked</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 font-handwriting text-center">
              Start adding entries to see your progress! 
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="doodle-card bg-gradient-to-br from-mint/20 to-soft-yellow/20 text-center">
          <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h4 className="font-handwriting text-lg text-primary mb-2">Track Daily</h4>
          <p className="text-sm text-muted-foreground">
            Record your mood and thoughts every day to build healthy habits
          </p>
        </div>

        <div className="doodle-card bg-gradient-to-br from-baby-pink/20 to-lavender/20 text-center">
          <div className="w-12 h-12 bg-baby-pink rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h4 className="font-handwriting text-lg text-primary mb-2">See Patterns</h4>
          <p className="text-sm text-muted-foreground">
            Visualize your emotional journey with beautiful charts and insights
          </p>
        </div>

        <div className="doodle-card bg-gradient-to-br from-sky-blue/20 to-mint/20 text-center">
          <div className="w-12 h-12 bg-sky-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💙</span>
          </div>
          <h4 className="font-handwriting text-lg text-primary mb-2">Self Care</h4>
          <p className="text-sm text-muted-foreground">
            Develop mindful awareness and practice self-compassion
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;