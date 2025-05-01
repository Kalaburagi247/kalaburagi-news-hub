
import { toast } from "sonner";

export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium?: {
            source_url: string;
          };
          full?: {
            source_url: string;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
    }>;
  };
  categories: number[];
  tags: number[];
  slug: string;
  link: string;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const API_BASE_URL = 'https://kalaburagi247.com/wp-json/wp/v2';

export const fetchLatestPosts = async (page = 1, perPage = 10): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts?_embed=true&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    toast.error('Failed to load latest news');
    return [];
  }
};

export const fetchPostsByCategory = async (categoryId: number, page = 1, perPage = 10): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts?_embed=true&categories=${categoryId}&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts for category ${categoryId}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    toast.error('Failed to load category news');
    return [];
  }
};

export const fetchPost = async (slug: string): Promise<WordPressPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_embed=true&slug=${slug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post with slug ${slug}`);
    }
    
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    toast.error('Failed to load article');
    return null;
  }
};

export const fetchCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories?per_page=100`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    toast.error('Failed to load categories');
    return [];
  }
};

export const searchPosts = async (query: string, page = 1, perPage = 10): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts?_embed=true&search=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to search posts with query ${query}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error searching posts with query ${query}:`, error);
    toast.error('Search failed');
    return [];
  }
};

export const getPostFeaturedImage = (post: WordPressPost): string => {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    
    // Try to get medium size
    if (media.media_details?.sizes?.medium) {
      return media.media_details.sizes.medium.source_url;
    }
    
    // Fallback to full size
    if (media.media_details?.sizes?.full) {
      return media.media_details.sizes.full.source_url;
    }
    
    // Fallback to source_url
    return media.source_url;
  }
  
  // Default placeholder
  return '/placeholder.svg';
};

export const getPostCategories = (post: WordPressPost): Array<{id: number; name: string; slug: string}> => {
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
    return post._embedded['wp:term'][0];
  }
  return [];
};

export const getPostAuthor = (post: WordPressPost): string => {
  if (post._embedded && post._embedded.author && post._embedded.author[0]) {
    return post._embedded.author[0].name;
  }
  return 'Kalaburagi 24/7';
};

export const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
