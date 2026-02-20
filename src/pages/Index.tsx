
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, WordPressCategory } from '../services/wordpress-api';
import LoadingSpinner from '../components/LoadingSpinner';
import TopHeader from '../components/TopHeader';
import BottomNavigation from '../components/BottomNavigation';
import { Newspaper, Briefcase, Trophy, Heart, Cpu, GraduationCap, Globe, Landmark, Clapperboard, Users, Leaf, Utensils, Palette, Car, DollarSign, Folder } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  news: <Newspaper className="h-6 w-6" />,
  business: <Briefcase className="h-6 w-6" />,
  sports: <Trophy className="h-6 w-6" />,
  health: <Heart className="h-6 w-6" />,
  technology: <Cpu className="h-6 w-6" />,
  education: <GraduationCap className="h-6 w-6" />,
  world: <Globe className="h-6 w-6" />,
  politics: <Landmark className="h-6 w-6" />,
  entertainment: <Clapperboard className="h-6 w-6" />,
  lifestyle: <Users className="h-6 w-6" />,
  environment: <Leaf className="h-6 w-6" />,
  food: <Utensils className="h-6 w-6" />,
  culture: <Palette className="h-6 w-6" />,
  automobile: <Car className="h-6 w-6" />,
  finance: <DollarSign className="h-6 w-6" />,
};

const getCategoryIcon = (slug: string) => {
  const lower = slug.toLowerCase();
  for (const key of Object.keys(categoryIcons)) {
    if (lower.includes(key)) return categoryIcons[key];
  }
  return <Folder className="h-6 w-6" />;
};

const Index: React.FC = () => {
  const { 
    data: categories, 
    isLoading 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="pb-20">
      <TopHeader />
      
      <main className="container px-4 pt-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category: WordPressCategory) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {getCategoryIcon(category.slug)}
                </div>
                <span className="text-xs font-medium leading-tight text-foreground">{category.name}</span>
                <span className="text-[10px] text-muted-foreground">{category.count} articles</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No categories found</p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
