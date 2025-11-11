import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <Stethoscope className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-5xl md:text-6xl font-display font-bold text-gradient">Aivara</span>
          </div>
          <p className="mb-10 text-base md:text-lg text-muted-foreground">
            Sign in or create an account to continue.
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button size="lg" asChild className="gradient-primary text-base">
              <Link to="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
