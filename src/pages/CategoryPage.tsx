
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostsByCategory, fetchCategories } from '../services/wordpress-api';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import BottomNavigation from '../components/BottomNavigation';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id || '0');
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['categoryPosts', categoryId],
    queryFn: () => fetchPostsByCategory(categoryId),
    enabled: !!categoryId,
  });
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  const category = categories?.find(cat => cat.id === categoryId);
  
  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container px-4 py-3 flex items-center">
          <Link to="/" className="mr-2">
            <ArrowLeft className="h-5 w-5 text-news-primary" />
          </Link>
          <h1 className="text-lg font-semibold truncate">
            {category ? category.name : 'Category'}
          </h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container px-4 py-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">Failed to load articles</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-news-accent underline"
            >
              Try again
            </button>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {posts.map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No articles found in this category</p>
            <Link to="/" className="mt-4 text-news-accent inline-block">
              Back to home
            </Link>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default CategoryPage;
