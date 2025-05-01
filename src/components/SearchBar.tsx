
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="relative w-full mb-4">
      <div className="flex">
        <Input
          type="search"
          placeholder="Search news articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow pr-10 focus:ring-2 focus:ring-news-primary"
        />
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon"
          className="absolute right-0 top-0 bottom-0"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
