import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, PlusCircle, BookOpen, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/add', label: 'Add Entry', icon: PlusCircle },
    { path: '/journal', label: 'View Journal', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-yellow via-mint to-baby-pink">
      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
              <h1 className="text-2xl font-handwriting text-primary">
                Mood Journal
              </h1>
            </Link>
            
            <div className="flex items-center gap-4">
              <nav className="flex gap-1">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-handwriting text-lg transition-all duration-200 ${
                      isActive(path)
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-primary hover:bg-primary/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
              </nav>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-handwriting">
                  {user?.email?.split('@')[0]}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="font-handwriting text-muted-foreground hover:text-primary"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-80px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t-2 border-border/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-handwriting text-lg">
            Made with love for your mental well-being 🌸
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;