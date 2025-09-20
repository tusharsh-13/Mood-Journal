import { WelcomeDoodle, QuoteBubble } from '@/assets/DoodleIllustration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Plus, BarChart3, Target, TrendingUp, Activity, Database } from 'lucide-react';

const insights = [
  "Consistent tracking leads to better self-awareness",
  "Your patterns reveal more than individual moments", 
  "Small changes can create significant improvements",
  "Data-driven insights help optimize your well-being",
  "Regular check-ins build emotional intelligence",
  "Understanding triggers helps manage responses",
  "Progress tracking motivates continued growth"
];

const Home = () => {
  const todaysInsight = insights[new Date().getDay()];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Activity className="w-10 h-10 text-primary" />
          Mood Analytics Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Track, analyze, and optimize your emotional patterns with data-driven insights
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Illustration */}
        <div className="lg:col-span-2">
          <Card className="modern-card h-full">
            <CardContent className="p-8">
              <WelcomeDoodle />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {/* Today's Insight */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Daily Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {todaysInsight}
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Link to="/add">
              <Button className="modern-button w-full justify-start text-left">
                <Plus className="w-5 h-5 mr-3" />
                Record Current Mood
              </Button>
            </Link>

            <Link to="/journal">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-5 h-5 mr-3" />
                View Analytics
              </Button>
            </Link>
          </div>

          {/* Stats Preview */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Days Tracked</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Start recording to see your patterns
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="modern-card text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Data Collection</h4>
            <p className="text-sm text-muted-foreground">
              Systematic mood tracking with contextual notes and timestamps
            </p>
          </CardContent>
        </Card>

        <Card className="modern-card text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Pattern Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Identify trends, triggers, and correlations in your emotional data
            </p>
          </CardContent>
        </Card>

        <Card className="modern-card text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-emerald-500" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Optimization</h4>
            <p className="text-sm text-muted-foreground">
              Use insights to make informed decisions about your well-being
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;