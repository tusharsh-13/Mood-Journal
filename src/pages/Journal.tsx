import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodEmoji } from '@/assets/DoodleIllustration';
import { Search, Calendar, Download, BarChart3, Filter, Database, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Entry {
  id: string;
  created_at: string;
  mood: string;
  notes: string;
}

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load entries');
        console.error('Error fetching entries:', error);
      } else {
        setEntries(data || []);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry =>
    entry.mood.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(new Date(entry.created_at), 'PPP').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportPDF = () => {
    toast.info('Export functionality coming soon');
  };

  const getMoodColor = (mood: string) => {
    const moodColors: { [key: string]: string } = {
      Happy: 'mood-happy',
      Sad: 'mood-sad',
      Excited: 'mood-excited',
      Calm: 'mood-calm',
      Stressed: 'mood-stressed',
      Angry: 'mood-angry',
      Grateful: 'mood-happy',
      Anxious: 'mood-stressed',
      Tired: 'mood-sad',
      Energetic: 'mood-excited'
    };
    return moodColors[mood] || 'mood-happy';
  };

  const getMoodStats = () => {
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b, 'N/A'
    );

    const uniqueDays = new Set(
      entries.map(entry => format(new Date(entry.created_at), 'yyyy-MM-dd'))
    ).size;

    return { mostCommonMood, uniqueDays };
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <Database className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            Loading analytics data...
          </h3>
        </div>
      </div>
    );
  }

  const stats = getMoodStats();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          Mood Analytics
        </h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive view of your emotional patterns and trends
        </p>
      </div>

      {/* Controls */}
      <Card className="modern-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search entries by mood, date, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border border-border"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="modern-card text-center">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-primary">{entries.length}</p>
            <p className="text-sm text-muted-foreground">Total Entries</p>
          </CardContent>
        </Card>
        <Card className="modern-card text-center">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-primary">{stats.uniqueDays}</p>
            <p className="text-sm text-muted-foreground">Days Tracked</p>
          </CardContent>
        </Card>
        <Card className="modern-card text-center">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-primary">{stats.mostCommonMood}</p>
            <p className="text-sm text-muted-foreground">Most Frequent</p>
          </CardContent>
        </Card>
        <Card className="modern-card text-center">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-primary">{Math.round((entries.length / Math.max(stats.uniqueDays, 1)) * 10) / 10}</p>
            <p className="text-sm text-muted-foreground">Avg/Day</p>
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="modern-card">
            <CardContent className="text-center py-12">
              <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">
                {searchTerm ? 'No matching entries found' : 'No entries recorded yet'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'Try adjusting your search criteria'
                  : 'Start tracking your mood to build your analytics dataset'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="modern-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MoodEmoji mood={entry.mood} className="w-8 h-8" />
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {entry.mood} Mood Entry
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">
                        {format(new Date(entry.created_at), 'MMM dd, yyyy')} • {format(new Date(entry.created_at), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getMoodColor(entry.mood)}`}>
                    {entry.mood}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                  <p className="text-foreground leading-relaxed font-mono text-sm">
                    {entry.notes || 'No additional notes provided'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Progress Message */}
      {entries.length > 0 && (
        <Card className="modern-card">
          <CardContent className="text-center p-8">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Data Collection In Progress
            </h3>
            <p className="text-muted-foreground">
              Continue tracking consistently to unlock deeper insights and identify meaningful patterns in your emotional data.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Journal;