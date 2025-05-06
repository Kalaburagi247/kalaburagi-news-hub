
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { WordPressCategory } from '../services/wordpress-api';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

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
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => (
              <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-auto">
                <Link to={`/category/${category.id}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-news-primary hover:text-white transition-colors whitespace-nowrap"
                  >
                    {category.name}
                  </Button>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

export default CategoryList;
