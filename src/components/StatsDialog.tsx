import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Calendar, Smile } from 'lucide-react';
import { format, differenceInDays, startOfDay } from 'date-fns';

interface Entry {
  id: string;
  created_at: string;
  mood: string;
  notes: string;
}

interface StatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: Entry[];
}

export const StatsDialog = ({ open, onOpenChange, entries }: StatsDialogProps) => {
  // Calculate most common mood
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Calculate unique days tracked
  const uniqueDays = new Set(
    entries.map(entry => format(new Date(entry.created_at), 'yyyy-MM-dd'))
  ).size;

  // Calculate current streak
  const sortedDates = [...entries]
    .map(entry => startOfDay(new Date(entry.created_at)))
    .sort((a, b) => b.getTime() - a.getTime());

  let currentStreak = 0;
  if (sortedDates.length > 0) {
    const today = startOfDay(new Date());
    let checkDate = today;
    
    for (let i = 0; i < sortedDates.length; i++) {
      const entryDate = sortedDates[i];
      const daysDiff = differenceInDays(checkDate, entryDate);
      
      if (daysDiff === 0) {
        currentStreak++;
        checkDate = startOfDay(new Date(checkDate.getTime() - 24 * 60 * 60 * 1000));
      } else if (daysDiff > 1) {
        break;
      }
    }
  }

  // Average entries per day
  const avgEntriesPerDay = uniqueDays > 0 ? (entries.length / uniqueDays).toFixed(1) : '0';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Your Mood Statistics
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Total Entries</h3>
            </div>
            <p className="text-3xl font-bold text-primary">{entries.length}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Days Tracked</h3>
            </div>
            <p className="text-3xl font-bold text-primary">{uniqueDays}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Smile className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Most Common Mood</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{mostCommonMood}</p>
            <p className="text-sm text-muted-foreground">{moodCounts[mostCommonMood] || 0} times</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Current Streak</h3>
            </div>
            <p className="text-3xl font-bold text-primary">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">consecutive days</p>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Mood Breakdown</h3>
          <div className="space-y-2">
            {Object.entries(moodCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([mood, count]) => (
                <div key={mood} className="flex items-center justify-between">
                  <span className="text-sm">{mood}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(count / entries.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {count} ({Math.round((count / entries.length) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Average entries per day: <span className="font-semibold text-foreground">{avgEntriesPerDay}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
