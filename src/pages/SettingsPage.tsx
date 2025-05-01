
import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container px-4 py-3 flex items-center">
          <Link to="/" className="mr-2">
            <ArrowLeft className="h-5 w-5 text-news-primary" />
          </Link>
          <h1 className="text-lg font-semibold truncate">Settings</h1>
        </div>
      </header>
      
      {/* Settings */}
      <main className="container px-4 py-4">
        <div className="space-y-6">
          <div className="pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <div className="prose prose-sm max-w-none">
              <p>Kalaburagi 24/7 is your source for local news and updates from Kalaburagi (Gulbarga) and surrounding areas.</p>
              <p className="mt-2">Stay informed with the latest news, events, and stories from your community.</p>
            </div>
          </div>
          
          <div className="pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Visit Website</h2>
            <a 
              href="https://kalaburagi247.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-news-secondary"
            >
              kalaburagi247.com
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4">App Version</h2>
            <p className="text-sm text-gray-600">1.0.0</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <p className="text-sm text-gray-600">For support or inquiries, please contact us through our website.</p>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;
