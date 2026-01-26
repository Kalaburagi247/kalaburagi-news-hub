
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings } from 'lucide-react';

const TopHeader: React.FC = () => {
  return (
    <header className="bg-news-primary text-white p-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Kalaburagi 24/7</h1>
        <p className="text-sm text-white/80">Your source for local news</p>
      </div>
      <div className="flex items-center gap-3">
        <Link 
          to="/search" 
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5 text-white" />
        </Link>
        <Link 
          to="/settings" 
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5 text-white" />
        </Link>
      </div>
    </header>
  );
};

export default TopHeader;
