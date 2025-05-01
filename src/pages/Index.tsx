
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLatestPosts, fetchCategories, WordPressPost } from '../services/wordpress-api';
import ArticleCard from '../components/ArticleCard';
import CategoryList from '../components/CategoryList';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import BottomNavigation from '../components/BottomNavigation';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const { 
    data: posts, 
    isLoading: postsLoading, 
    error: postsError 
  } = useQuery({
    queryKey: ['latestPosts'],
    queryFn: () => fetchLatestPosts(1, 15),
  });
  
  const { 
    data: categories, 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  useEffect(() => {
    if (postsError) {
      toast.error('Failed to load latest news');
      console.error('Error loading posts:', postsError);
    }
  }, [postsError]);
  
  // Split posts into featured and regular
  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  const regularPosts = posts && posts.length > 1 ? posts.slice(1) : [];
  
  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-news-primary text-white p-4">
        <h1 className="text-2xl font-bold text-white">Kalaburagi 24/7</h1>
        <p className="text-sm text-white/80">Your source for local news</p>
      </header>
      
      {/* Search */}
      <div className="px-4 pt-4">
        <SearchBar />
      </div>
      
      {/* Main content */}
      <main className="container px-4">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <CategoryList categories={categories} loading={categoriesLoading} />
        )}
        
        {/* Featured Post */}
        <h2 className="text-xl font-bold mb-3">Latest News</h2>
        {postsLoading ? (
          <LoadingSpinner />
        ) : postsError ? (
          <div className="text-center py-8">
            <p className="text-destructive">Failed to load articles</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-news-accent underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            {featuredPost && (
              <ArticleCard post={featuredPost} isFeature={true} />
            )}
            
            {/* Regular Posts */}
            <div className="grid grid-cols-1 gap-4">
              {regularPosts.map((post: WordPressPost) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
