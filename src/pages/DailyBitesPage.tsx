
import React from 'react';
import TopHeader from '../components/TopHeader';
import BottomNavigation from '../components/BottomNavigation';
import { Coffee } from 'lucide-react';

const DailyBitesPage: React.FC = () => {
  return (
    <div className="pb-20">
      <TopHeader />
      <main className="container px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Coffee className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Daily Bites</h2>
          <p className="text-muted-foreground">Coming soon! Daily digest content will appear here.</p>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default DailyBitesPage;
