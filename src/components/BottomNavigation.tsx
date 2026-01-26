
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutList, Film, Zap, Coffee } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
        end
      >
        <Home className="h-5 w-5 mb-1" />
        <span>Home</span>
      </NavLink>
      <NavLink 
        to="/categories" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <LayoutList className="h-5 w-5 mb-1" />
        <span>Categories</span>
      </NavLink>
      <NavLink 
        to="/reels" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <Film className="h-5 w-5 mb-1" />
        <span>Reels</span>
      </NavLink>
      <NavLink 
        to="/flash-news" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <Zap className="h-5 w-5 mb-1" />
        <span>Flash News</span>
      </NavLink>
      <NavLink 
        to="/daily-bites" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <Coffee className="h-5 w-5 mb-1" />
        <span>Daily Bites</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
