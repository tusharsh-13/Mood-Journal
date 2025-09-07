import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-soft-yellow via-mint to-baby-pink">
      <div className="text-center doodle-card bg-white/80 max-w-md mx-4">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="mb-4 text-4xl font-handwriting text-primary">Oops!</h1>
        <p className="mb-6 text-xl text-muted-foreground font-handwriting">
          This page seems to have wandered off...
        </p>
        <Link 
          to="/" 
          className="doodle-button bg-baby-pink hover:bg-baby-pink/80 text-foreground border-2 border-primary/30 inline-flex items-center"
        >
          🏠 Take me home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
