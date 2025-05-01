
import React from 'react';
import { Link } from 'react-router-dom';
import { WordPressPost, getPostFeaturedImage, formatDate, stripHtmlTags } from '../services/wordpress-api';
import { Card } from './ui/card';

interface ArticleCardProps {
  post: WordPressPost;
  isFeature?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, isFeature = false }) => {
  const featuredImage = getPostFeaturedImage(post);
  const excerpt = stripHtmlTags(post.excerpt.rendered).slice(0, 120) + (stripHtmlTags(post.excerpt.rendered).length > 120 ? '...' : '');
  const date = formatDate(post.date);
  
  return (
    <Link to={`/article/${post.slug}`}>
      <Card className={`article-card ${isFeature ? 'mb-6' : 'mb-4'}`}>
        <div className={`relative ${isFeature ? 'aspect-[16/9]' : 'aspect-[4/3]'} w-full overflow-hidden`}>
          <img 
            src={featuredImage} 
            alt={post.title.rendered}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isFeature && (
            <div className="absolute bottom-0 left-0 bg-news-accent text-white px-2 py-1 text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="article-meta mb-1">
            <span>{date}</span>
          </div>
          <h3 
            className={`article-title ${isFeature ? 'text-xl' : 'text-lg'}`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {(isFeature || excerpt) && (
            <p className="article-excerpt">{excerpt}</p>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
