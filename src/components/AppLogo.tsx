
import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    'sm': 'w-8 h-8',
    'md': 'w-12 h-12',
    'lg': 'w-16 h-16',
    'xl': 'w-24 h-24',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="/lovable-uploads/57fd9bb0-1e1a-40a4-9fdd-5e6717aac1db.png" 
        alt="Kalaburagi 24/7 Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default AppLogo;
