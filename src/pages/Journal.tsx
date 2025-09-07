import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MoodEmoji } from '@/assets/DoodleIllustration';
import { Search, Calendar, Download, BarChart3, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

// Mock data - in real app this would come from API
const mockEntries = [
  {
    id: 1,
    createdAt: new Date('2024-01-15T10:30:00'),
    mood: 'Happy',
    notes: 'Had a wonderful morning walk in the park. The fresh air really helped clear my mind and I felt so grateful for the beautiful weather.'
  },
  {
    id: 2,
    createdAt: new Date('2024-01-14T15:45:00'),
    mood: 'Stressed',
    notes: 'Work was really overwhelming today. Had three deadlines and felt like I was drowning. Need to remember to take breaks and breathe.'
  },
  {
    id: 3,
    createdAt: new Date('2024-01-13T20:15:00'),
    mood: 'Grateful',
    notes: 'Spent quality time with family today. We cooked dinner together and shared so many laughs. These moments are precious.'
  },
  {
    id: 4,
    createdAt: new Date('2024-01-12T09:00:00'),
    mood: 'Excited',
    notes: 'Starting a new project at work today! Feeling energized and ready to tackle new challenges. Love learning new things.'
  },
  {
    id: 5,
    createdAt: new Date('2024-01-11T18:30:00'),
    mood: 'Calm',
    notes: 'Meditation session was really peaceful today. 20 minutes of quiet time made such a difference in my mindset.'
  }
];

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entries] = useState(mockEntries);

  const filteredEntries = entries.filter(entry =>
    entry.mood.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(entry.createdAt, 'PPP').toLowerCase().includes(searchTerm.toLowerCase())
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
                          {format(entry.createdAt, 'EEEE, MMMM do, yyyy')} at {format(entry.createdAt, 'h:mm a')}
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