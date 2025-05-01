
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPost, getPostFeaturedImage, formatDate, getPostCategories } from '../services/wordpress-api';
import LoadingSpinner from '../components/LoadingSpinner';
import BottomNavigation from '../components/BottomNavigation';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchPost(slug || ''),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-destructive mb-4">Failed to load article</h2>
        <Link to="/" className="text-news-primary flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
        </Link>
      </div>
    );
  }
  
  const featuredImage = getPostFeaturedImage(post);
  const categories = getPostCategories(post);
  const date = formatDate(post.date);
  
  return (
    <div className="pb-20">
      {/* Header with back button */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container px-4 py-3 flex items-center">
          <Link to="/" className="mr-2">
            <ArrowLeft className="h-5 w-5 text-news-primary" />
          </Link>
          <h1 className="text-lg font-semibold truncate">Article</h1>
        </div>
      </header>
      
      {/* Article content */}
      <main className="container px-4 py-4">
        <h1 
          className="text-2xl font-bold mb-3"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {date}
          </span>
          {categories.length > 0 && (
            <span className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {categories[0].name}
            </span>
          )}
        </div>
        
        {featuredImage && (
          <div className="mb-4">
            <img 
              src={featuredImage} 
              alt={post.title.rendered}
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
        
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
        
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold mb-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  className="text-xs bg-news-secondary text-white px-2 py-1 rounded-full"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ArticlePage;
