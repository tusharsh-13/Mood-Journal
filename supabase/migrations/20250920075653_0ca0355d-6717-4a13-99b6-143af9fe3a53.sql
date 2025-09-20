-- Fix security definer view issue
-- Drop the existing view and recreate it without SECURITY DEFINER
DROP VIEW IF EXISTS public.mood_stats;

-- Recreate the view as SECURITY INVOKER (default behavior)
-- This ensures the view respects the querying user's RLS policies
CREATE VIEW public.mood_stats AS
SELECT 
    mood,
    count(*) AS count
FROM public.entries
WHERE user_id = auth.uid()
GROUP BY mood;

-- Grant appropriate permissions
GRANT SELECT ON public.mood_stats TO authenticated;