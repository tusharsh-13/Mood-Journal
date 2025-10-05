import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Heart, LogIn, UserPlus } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and click the confirmation link');
        } else if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else if (error.message.includes('User already registered')) {
          toast.error('This email is already registered. Try logging in instead.');
        } else {
          toast.error(error.message);
        }
      } else {
        if (isLogin) {
          toast.success('Welcome back! 💜');
          navigate('/');
        } else {
          toast.success('Account created! Please check your email to confirm your account.');
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-yellow/20 via-mint/20 to-baby-pink/20 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Heart className="w-16 h-16 text-baby-pink mx-auto mb-4" />
          <h1 className="text-4xl font-handwriting text-primary mb-2">
            Welcome to Your Mood Journal
          </h1>
          <p className="text-muted-foreground font-handwriting">
            {isLogin ? 'Sign in to continue your journey' : 'Create your account to start journaling'}
          </p>
        </div>

        {/* Auth Form */}
        <Card className="doodle-card bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center font-handwriting text-2xl text-primary flex items-center justify-center gap-2">
              {isLogin ? (
                <>
                  <LogIn className="w-6 h-6" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-6 h-6" />
                  Create Account
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-handwriting text-lg">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-12 border-2 border-primary/30 font-handwriting text-lg"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="font-handwriting text-lg">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 border-2 border-primary/30 font-handwriting text-lg"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="doodle-button w-full h-12 bg-baby-pink hover:bg-baby-pink/80 text-foreground border-2 border-primary/30 text-lg"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            {/* Toggle between login/signup */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground font-handwriting">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="font-handwriting text-primary hover:text-primary/80"
              >
                {isLogin ? 'Create one here' : 'Sign in instead'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Helpful info */}
        <div className="text-center text-sm text-muted-foreground font-handwriting space-y-1">
          <p>🔒 Your data is secure and private</p>
          <p>✨ Start tracking your moods today</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;