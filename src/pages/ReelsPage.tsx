
import React from 'react';
import TopHeader from '../components/TopHeader';
import BottomNavigation from '../components/BottomNavigation';
import { Film } from 'lucide-react';

const ReelsPage: React.FC = () => {
  return (
    <div className="pb-20">
      <TopHeader />
      <main className="container px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Film className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Reels</h2>
          <p className="text-muted-foreground">Coming soon! Short video content will appear here.</p>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default ReelsPage;
