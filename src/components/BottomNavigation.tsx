
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, LayoutList, Settings } from 'lucide-react';

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
        <Home className="h-6 w-6 mb-1" />
        <span>Home</span>
      </NavLink>
      <NavLink 
        to="/categories" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <LayoutList className="h-6 w-6 mb-1" />
        <span>Categories</span>
      </NavLink>
      <NavLink 
        to="/search" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <Search className="h-6 w-6 mb-1" />
        <span>Search</span>
      </NavLink>
      <NavLink 
        to="/settings" 
        className={({ isActive }) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <Settings className="h-6 w-6 mb-1" />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
