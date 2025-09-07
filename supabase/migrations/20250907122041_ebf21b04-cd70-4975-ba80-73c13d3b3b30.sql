-- Fix security definer view issue by recreating mood_stats view properly
DROP VIEW IF EXISTS public.mood_stats;

-- Create view for mood statistics without security definer
CREATE VIEW public.mood_stats AS
SELECT 
  mood, 
  COUNT(*) as count
FROM public.entries
WHERE user_id = auth.uid()
GROUP BY mood;