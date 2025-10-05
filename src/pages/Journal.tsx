import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MoodEmoji } from '@/assets/DoodleIllustration';
import { Search, Calendar, Download, BarChart3, Sparkles } from 'lucide-react';
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
    // In real app, this would use html2canvas + jsPDF
    alert('PDF export feature coming soon! 📄✨');
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-2xl font-handwriting text-primary mb-2">
            Loading your journal...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-handwriting text-primary mb-4 flex items-center justify-center gap-3">
          <Calendar className="w-10 h-10 text-lavender" />
          Your Mood Journal
        </h1>
        <p className="text-lg text-muted-foreground font-handwriting">
          Reflect on your emotional journey 📖💜
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by mood, date, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 border-2 border-primary/30 font-handwriting text-lg"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleExportPDF}
            className="doodle-button bg-mint hover:bg-mint/80 text-foreground border-2 border-primary/30"
          >
            <Download className="w-5 h-5 mr-2" />
            Export PDF
          </Button>
          
          <Button className="doodle-button bg-sky-blue hover:bg-sky-blue/80 text-foreground border-2 border-primary/30">
            <BarChart3 className="w-5 h-5 mr-2" />
            View Stats
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="doodle-card bg-gradient-to-br from-soft-yellow/30 to-mint/30 text-center">
          <p className="text-2xl font-handwriting text-primary">{entries.length}</p>
          <p className="text-sm text-muted-foreground">Total Entries</p>
        </div>
        <div className="doodle-card bg-gradient-to-br from-baby-pink/30 to-lavender/30 text-center">
          <p className="text-2xl font-handwriting text-primary">5</p>
          <p className="text-sm text-muted-foreground">Days Tracked</p>
        </div>
        <div className="doodle-card bg-gradient-to-br from-mint/30 to-sky-blue/30 text-center">
          <p className="text-2xl font-handwriting text-primary">Happy</p>
          <p className="text-sm text-muted-foreground">Most Common</p>
        </div>
        <div className="doodle-card bg-gradient-to-br from-lavender/30 to-baby-pink/30 text-center">
          <p className="text-2xl font-handwriting text-primary">5</p>
          <p className="text-sm text-muted-foreground">Day Streak</p>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-handwriting text-primary mb-2">
              {searchTerm ? 'No entries found' : 'No entries yet'}
            </h3>
            <p className="text-muted-foreground font-handwriting">
              {searchTerm 
                ? 'Try searching for something else or clear your search'
                : 'Start by adding your first mood entry!'
              }
            </p>
          </div>
        ) : (
          filteredEntries.map((entry, index) => (
            <div key={entry.id}>
              <Card className="doodle-card bg-gradient-to-br from-white/80 to-soft-yellow/20 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MoodEmoji mood={entry.mood} className="w-10 h-10" />
                      <div>
                        <h3 className="font-handwriting text-xl text-primary">
                          Feeling {entry.mood}
                        </h3>
                        <p className="text-sm text-muted-foreground font-handwriting">
                          {format(new Date(entry.created_at), 'EEEE, MMMM do, yyyy')} at {format(new Date(entry.created_at), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-handwriting ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="paper-lines bg-white/50 rounded-lg p-4 border border-primary/20">
                    <p className="font-handwriting text-lg leading-relaxed text-foreground">
                      {entry.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Decorative divider between entries */}
              {index < filteredEntries.length - 1 && (
                <div className="flex items-center justify-center py-4">
                  <div className="squiggly-divider w-32"></div>
                  <Sparkles className="w-6 h-6 text-primary mx-4" />
                  <div className="squiggly-divider w-32"></div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Encouragement Message */}
      {entries.length > 0 && (
        <div className="mt-12 text-center doodle-card bg-gradient-to-br from-baby-pink/20 to-lavender/20">
          <div className="text-4xl mb-3">🌟</div>
          <h3 className="font-handwriting text-xl text-primary mb-2">
            You're doing great!
          </h3>
          <p className="text-muted-foreground font-handwriting">
            Keep tracking your moods to better understand your emotional patterns and celebrate your growth.
          </p>
        </div>
      )}
    </div>
  );
};

export default Journal;