import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodEmoji } from '@/assets/DoodleIllustration';
import { PenTool, Save, Sparkles } from 'lucide-react';
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
      toast.error('Please select a mood first! 💭');
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
        toast.success('✨ Your mood has been saved!', {
          description: 'Your entry has been added to your journal'
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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-handwriting text-primary mb-4 flex items-center justify-center gap-3">
          <PenTool className="w-10 h-10 text-baby-pink" />
          How are you feeling today?
        </h1>
        <p className="text-lg text-muted-foreground font-handwriting">
          Take a moment to check in with yourself 💜
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood Selection */}
        <Card className="doodle-card bg-gradient-to-br from-lavender/20 to-sky-blue/20">
          <CardHeader>
            <CardTitle className="font-handwriting text-xl text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Choose Your Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMood} onValueChange={setSelectedMood}>
              <SelectTrigger className="w-full h-14 border-2 border-primary/30 font-handwriting text-lg">
                <SelectValue placeholder="Pick the mood that fits you right now..." />
              </SelectTrigger>
              <SelectContent>
                {moods.map((mood) => (
                  <SelectItem key={mood} value={mood} className="font-handwriting text-lg">
                    <div className="flex items-center gap-3">
                      <MoodEmoji mood={mood} />
                      {mood}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedMood && (
              <div className="mt-4 p-4 bg-white rounded-xl border-2 border-primary/20">
                <div className="flex items-center justify-center gap-3">
                  <MoodEmoji mood={selectedMood} className="w-12 h-12" />
                  <span className="text-2xl font-handwriting text-primary">
                    I'm feeling {selectedMood.toLowerCase()} today
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="doodle-card bg-gradient-to-br from-mint/20 to-soft-yellow/20">
          <CardHeader>
            <CardTitle className="font-handwriting text-xl text-primary">
              What's on your mind?
            </CardTitle>
            <p className="text-muted-foreground font-handwriting">
              Share your thoughts, experiences, or anything you'd like to remember about today
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Today I felt... because... I'm grateful for... I learned that..."
              className="paper-lines min-h-40 border-2 border-primary/30 font-handwriting text-lg resize-none"
              style={{ lineHeight: '26px', paddingTop: '12px' }}
            />
            <p className="text-sm text-muted-foreground mt-2 font-handwriting">
              {notes.length} characters • Write as much or as little as you'd like
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={isLoading || !selectedMood}
            className="doodle-button bg-baby-pink hover:bg-baby-pink/80 text-foreground border-2 border-primary/30 px-8 py-4 text-xl"
          >
            <Save className="w-6 h-6 mr-3" />
            {isLoading ? 'Saving your thoughts...' : 'Save My Entry'}
          </Button>
        </div>
      </form>

      {/* Helpful Tips */}
      <div className="mt-8 doodle-card bg-gradient-to-br from-baby-pink/10 to-lavender/10">
        <h3 className="font-handwriting text-lg text-primary mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span>
          Tips for Better Journaling
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground font-handwriting">
          <li>• Be honest with yourself - there are no wrong feelings</li>
          <li>• Try to write something every day, even if it's just one word</li>
          <li>• Notice patterns in your moods over time</li>
          <li>• Celebrate small wins and progress</li>
          <li>• Remember: this is your safe space 💜</li>
        </ul>
      </div>
    </div>
  );
};

export default AddEntry;