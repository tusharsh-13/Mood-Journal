import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Plus, BarChart3, Home, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/add', label: 'Add Entry', icon: Plus },
    { path: '/journal', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="w-7 h-7 text-primary" />
              <h1 className="text-xl font-bold text-primary">
                MoodMetrics
              </h1>
            </Link>
            
            <div className="flex items-center gap-6">
              <nav className="flex gap-1">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </nav>
              
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-mono">
                    {user?.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Exit
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
      <footer className="border-t border-border bg-card/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            Advanced mood tracking and analytics platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;