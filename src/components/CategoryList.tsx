
import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { WordPressCategory } from '../services/wordpress-api';

interface CategoryListProps {
  categories: WordPressCategory[];
  loading: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, loading }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-2">Categories</h2>
      {loading ? (
        <div className="flex justify-center">
          <p>Loading categories...</p>
        </div>
      ) : (
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-news-primary hover:text-white transition-colors"
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default CategoryList;
