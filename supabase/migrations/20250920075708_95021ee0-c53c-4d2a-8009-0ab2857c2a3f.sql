-- Explicitly recreate the view as SECURITY INVOKER to fix the security definer issue
DROP VIEW IF EXISTS public.mood_stats;

-- Create view with explicit SECURITY INVOKER to ensure user's RLS policies apply
CREATE VIEW public.mood_stats 
WITH (security_invoker=true) AS
SELECT 
    mood,
    count(*) AS count
FROM public.entries
WHERE user_id = auth.uid()
GROUP BY mood;