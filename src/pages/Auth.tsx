import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Activity, LogIn, UserPlus, Lock, Mail } from 'lucide-react';

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
          toast.success('Access granted');
          navigate('/');
        } else {
          toast.success('Account created. Please check your email to confirm your account.');
        }
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Activity className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-foreground">
            MoodMetrics
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Access your analytics dashboard' : 'Create your tracking account'}
          </p>
        </div>

        {/* Auth Form */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-center text-xl flex items-center justify-center gap-2">
              {isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 bg-input border border-border"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 bg-input border border-border"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="modern-button w-full"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            {/* Toggle between login/signup */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Need an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary/80 text-sm"
              >
                {isLogin ? 'Create one here' : 'Sign in instead'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <div className="text-center text-xs text-muted-foreground space-y-1 font-mono">
          <p>🔒 End-to-end encrypted</p>
          <p>📊 Analytics-ready data</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;