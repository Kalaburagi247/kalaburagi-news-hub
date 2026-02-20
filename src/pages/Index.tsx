
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, WordPressCategory } from '../services/wordpress-api';
import LoadingSpinner from '../components/LoadingSpinner';
import TopHeader from '../components/TopHeader';
import BottomNavigation from '../components/BottomNavigation';
import { Newspaper, Briefcase, Trophy, Heart, Cpu, GraduationCap, Globe, Landmark, Clapperboard, Users, Leaf, Utensils, Palette, Car, DollarSign, Folder } from 'lucide-react';

const categoryStyles: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  news: { icon: <Newspaper className="h-7 w-7" />, bg: 'bg-red-100', color: 'text-red-600' },
  business: { icon: <Briefcase className="h-7 w-7" />, bg: 'bg-blue-100', color: 'text-blue-600' },
  sports: { icon: <Trophy className="h-7 w-7" />, bg: 'bg-amber-100', color: 'text-amber-600' },
  health: { icon: <Heart className="h-7 w-7" />, bg: 'bg-pink-100', color: 'text-pink-600' },
  technology: { icon: <Cpu className="h-7 w-7" />, bg: 'bg-cyan-100', color: 'text-cyan-600' },
  education: { icon: <GraduationCap className="h-7 w-7" />, bg: 'bg-indigo-100', color: 'text-indigo-600' },
  world: { icon: <Globe className="h-7 w-7" />, bg: 'bg-emerald-100', color: 'text-emerald-600' },
  politics: { icon: <Landmark className="h-7 w-7" />, bg: 'bg-violet-100', color: 'text-violet-600' },
  entertainment: { icon: <Clapperboard className="h-7 w-7" />, bg: 'bg-orange-100', color: 'text-orange-600' },
  lifestyle: { icon: <Users className="h-7 w-7" />, bg: 'bg-teal-100', color: 'text-teal-600' },
  environment: { icon: <Leaf className="h-7 w-7" />, bg: 'bg-green-100', color: 'text-green-600' },
  food: { icon: <Utensils className="h-7 w-7" />, bg: 'bg-yellow-100', color: 'text-yellow-600' },
  culture: { icon: <Palette className="h-7 w-7" />, bg: 'bg-fuchsia-100', color: 'text-fuchsia-600' },
  automobile: { icon: <Car className="h-7 w-7" />, bg: 'bg-slate-100', color: 'text-slate-600' },
  finance: { icon: <DollarSign className="h-7 w-7" />, bg: 'bg-lime-100', color: 'text-lime-600' },
};

const fallbackColors = [
  { bg: 'bg-rose-100', color: 'text-rose-600' },
  { bg: 'bg-sky-100', color: 'text-sky-600' },
  { bg: 'bg-purple-100', color: 'text-purple-600' },
  { bg: 'bg-emerald-100', color: 'text-emerald-600' },
  { bg: 'bg-amber-100', color: 'text-amber-600' },
  { bg: 'bg-cyan-100', color: 'text-cyan-600' },
  { bg: 'bg-pink-100', color: 'text-pink-600' },
  { bg: 'bg-indigo-100', color: 'text-indigo-600' },
];

const getCategoryStyle = (slug: string, index: number) => {
  const lower = slug.toLowerCase();
  for (const key of Object.keys(categoryStyles)) {
    if (lower.includes(key)) return categoryStyles[key];
  }
  const fallback = fallbackColors[index % fallbackColors.length];
  return { icon: <Folder className="h-7 w-7" />, ...fallback };
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
      
      <main className="container px-4 pt-6">
        <h2 className="text-xl font-bold mb-1">Explore</h2>
        <p className="text-sm text-muted-foreground mb-5">What are you looking for today?</p>
        {isLoading ? (
          <LoadingSpinner />
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category: WordPressCategory, index: number) => {
              const style = getCategoryStyle(category.slug, index);
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border bg-card hover:scale-105 transition-transform duration-200 text-center gap-2 shadow-sm"
                >
                  <div className={`w-14 h-14 rounded-2xl ${style.bg} flex items-center justify-center ${style.color}`}>
                    {style.icon}
                  </div>
                  <span className="text-xs font-semibold leading-tight text-foreground mt-1">{category.name}</span>
                  <span className="text-[10px] text-muted-foreground">{category.count}</span>
                </Link>
              );
            })}
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
