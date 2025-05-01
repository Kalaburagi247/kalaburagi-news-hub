
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchPosts } from '../services/wordpress-api';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import BottomNavigation from '../components/BottomNavigation';
import { ArrowLeft } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['searchPosts', query],
    queryFn: () => searchPosts(query),
    enabled: !!query,
  });
  
  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, refetch]);
  
  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container px-4 py-3 flex items-center">
          <Link to="/" className="mr-2">
            <ArrowLeft className="h-5 w-5 text-news-primary" />
          </Link>
          <h1 className="text-lg font-semibold truncate">Search</h1>
        </div>
      </header>
      
      {/* Search Box */}
      <div className="container px-4 py-4">
        <SearchBar />
        
        {query && (
          <h2 className="text-lg font-semibold mb-4">
            {isLoading ? 'Searching...' : 
             `Search results for "${query}"`}
          </h2>
        )}
        
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">Search failed</p>
            <button 
              onClick={() => refetch()} 
              className="mt-4 text-news-accent underline"
            >
              Try again
            </button>
          </div>
        ) : query ? (
          posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No articles found matching "{query}"</p>
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Enter keywords to search for articles</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
