import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodEmoji } from '@/assets/DoodleIllustration';
import { Activity, Save, TrendingUp, Target } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const moods = [
  'Happy', 'Sad', 'Excited', 'Angry', 'Stressed', 'Calm', 
  'Anxious', 'Grateful', 'Tired', 'Energetic'
];

const AddEntry = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast.error('Please select a mood first');
      return;
    }

    setIsLoading(true);
    
    try {
      if (!user) {
        toast.error('You must be logged in to save entries');
        return;
      }

      const { error } = await supabase
        .from('entries')
        .insert([{ 
          mood: selectedMood, 
          notes: notes || '',
          user_id: user.id
        }]);

      if (error) {
        toast.error('Failed to save entry. Please try again.');
        console.error('Error saving entry:', error);
      } else {
        toast.success('Entry saved successfully', {
          description: 'Your mood data has been recorded'
        });
        
        // Reset form
        setSelectedMood('');
        setNotes('');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <Activity className="w-8 h-8 text-primary" />
          Mood Check-in
        </h1>
        <p className="text-lg text-muted-foreground">
          Track your emotional state and add context to your day
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood Selection */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Current Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMood} onValueChange={setSelectedMood}>
              <SelectTrigger className="w-full h-12 bg-input border border-border">
                <SelectValue placeholder="Select your current mood..." />
              </SelectTrigger>
              <SelectContent>
                {moods.map((mood) => (
                  <SelectItem key={mood} value={mood} className="text-base">
                    <div className="flex items-center gap-3">
                      <MoodEmoji mood={mood} />
                      {mood}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedMood && (
              <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <MoodEmoji mood={selectedMood} className="w-8 h-8" />
                  <span className="text-base font-medium text-foreground">
                    Feeling {selectedMood.toLowerCase()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Additional Context
            </CardTitle>
            <p className="text-muted-foreground">
              Add any thoughts, events, or observations about your mood
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What contributed to this mood? Any specific events, thoughts, or circumstances worth noting..."
              className="min-h-32 bg-input border border-border resize-none font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {notes.length} characters • Optional but recommended for tracking patterns
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isLoading || !selectedMood}
            className="modern-button px-8 py-3 text-base"
          >
            <Save className="w-5 h-5 mr-2" />
            {isLoading ? 'Saving...' : 'Save Entry'}
          </Button>
        </div>
      </form>

      {/* Guidelines */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="text-lg">Mood Tracking Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be honest and objective about your current emotional state</li>
            <li>• Try to track consistently for better pattern recognition</li>
            <li>• Consider external factors that might influence your mood</li>
            <li>• Use the notes section to capture important context</li>
            <li>• Review your data regularly to identify trends and triggers</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEntry;