
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/wordpress-api';
import LoadingSpinner from '../components/LoadingSpinner';
import BottomNavigation from '../components/BottomNavigation';
import { ArrowLeft, ArrowRight, Folder } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['allCategories'],
    queryFn: fetchCategories,
  });
  
  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container px-4 py-3 flex items-center">
          <Link to="/" className="mr-2">
            <ArrowLeft className="h-5 w-5 text-news-primary" />
          </Link>
          <h1 className="text-lg font-semibold truncate">Categories</h1>
        </div>
      </header>
      
      {/* Category List */}
      <main className="container px-4 py-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">Failed to load categories</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-news-accent underline"
            >
              Try again
            </button>
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Folder className="h-5 w-5 mr-3 text-news-secondary" />
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.count} articles</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default CategoriesPage;
