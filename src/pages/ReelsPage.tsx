import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import TopHeader from '../components/TopHeader';
import BottomNavigation from '../components/BottomNavigation';
import ReelCard from '../components/ReelCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchReelPosts, getPostVideoUrl, WordPressPost } from '../services/wordpress-api';
import { Film, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

const ReelsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: posts = [], isLoading, error, refetch } = useQuery({
    queryKey: ['reels'],
    queryFn: () => fetchReelPosts(1, 20),
  });

  // Filter posts that have video content or use all posts for now
  const reelPosts = posts;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      const newIndex = Math.round(scrollTop / height);
      if (newIndex !== activeIndex && newIndex < reelPosts.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, reelPosts.length]);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || reelPosts.length === 0) {
    return (
      <div className="h-screen bg-black">
        <TopHeader />
        <main className="flex flex-col items-center justify-center h-[calc(100vh-140px)] text-center px-4">
          <Film className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-white">No Reels Available</h2>
          <p className="text-muted-foreground mb-4">
            Add posts to the "reels" or "videos" category in WordPress to see them here.
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Tip: Create a category called "reels" and add video posts to it.
          </p>
          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Reels Container - Vertical Scroll */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {reelPosts.map((post: WordPressPost, index: number) => (
          <div 
            key={post.id} 
            className="h-screen w-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ReelCard
              post={post}
              videoUrl={getPostVideoUrl(post)}
              isActive={index === activeIndex}
            />
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="fixed right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-30">
        {reelPosts.slice(0, 10).map((_, index) => (
          <div
            key={index}
            className={`w-1 rounded-full transition-all ${
              index === activeIndex 
                ? 'h-6 bg-white' 
                : 'h-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default ReelsPage;
