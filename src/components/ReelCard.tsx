import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { WordPressPost, getPostFeaturedImage, stripHtmlTags, getPostAuthor, formatDate } from '../services/wordpress-api';

interface ReelCardProps {
  post: WordPressPost;
  videoUrl: string | null;
  isActive: boolean;
}

const ReelCard: React.FC<ReelCardProps> = ({ post, videoUrl, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: stripHtmlTags(post.title.rendered),
        url: post.link,
      });
    } catch {
      // Share API not supported or user cancelled
    }
  };

  const isYouTube = videoUrl?.includes('youtube.com');
  const isVimeo = videoUrl?.includes('vimeo.com');
  const isEmbed = isYouTube || isVimeo;

  return (
    <div className="relative h-full w-full bg-black snap-start snap-always">
      {/* Video/Image Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {videoUrl && !isEmbed ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onClick={togglePlay}
          />
        ) : isEmbed ? (
          <iframe
            src={`${videoUrl}?autoplay=${isActive ? 1 : 0}&mute=1&loop=1&controls=0`}
            className="h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          // Fallback to featured image if no video
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${getPostFeaturedImage(post)})` }}
          />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Play/Pause Indicator */}
      {!isEmbed && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-10"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {(showControls || !isPlaying) && (
            <div className="bg-black/50 rounded-full p-4 transition-opacity">
              {isPlaying ? (
                <Pause className="h-12 w-12 text-white" />
              ) : (
                <Play className="h-12 w-12 text-white" />
              )}
            </div>
          )}
        </button>
      )}

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-32 flex flex-col gap-5 z-20">
        <button className="flex flex-col items-center gap-1">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-3">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Like</span>
        </button>
        
        <button className="flex flex-col items-center gap-1">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-3">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Comment</span>
        </button>
        
        <button onClick={handleShare} className="flex flex-col items-center gap-1">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-3">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Share</span>
        </button>
        
        {!isEmbed && (
          <button onClick={toggleMute} className="flex flex-col items-center gap-1">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-3">
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-white" />
              ) : (
                <Volume2 className="h-6 w-6 text-white" />
              )}
            </div>
            <span className="text-white text-xs font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
        )}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-20 left-0 right-16 p-4 z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">
              {getPostAuthor(post).charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-white font-semibold text-sm">{getPostAuthor(post)}</span>
          <span className="text-white/60 text-xs">• {formatDate(post.date)}</span>
        </div>
        
        <h3 
          className="text-white font-bold text-base leading-tight mb-1"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <p className="text-white/80 text-sm line-clamp-2">
          {stripHtmlTags(post.excerpt.rendered)}
        </p>
      </div>
    </div>
  );
};

export default ReelCard;
