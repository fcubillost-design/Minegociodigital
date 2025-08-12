
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex-shrink-0">
          <svg className="w-12 h-12 text-white" viewBox="0 0 162 143" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M109.914 26.4907C113.578 19.3331 123.422 19.3331 127.086 26.4907L158.423 83.3331C162.087 90.4907 157.165 99.3331 148.937 99.3331H88.0627C80.2307 99.3331 75.1275 90.932 78.4314 83.9213L109.914 26.4907Z" fill="#F37F1B"/>
            <path d="M78.6923 54.381C82.3563 47.2234 92.2003 47.2234 95.8643 54.381L127.198 111.223C130.862 118.381 125.94 127.223 117.712 127.223H56.8383C49.0063 127.223 43.9031 118.822 47.207 111.811L78.6923 54.381Z" fill="#E4002B"/>
            <ellipse cx="81" cy="116" rx="81" ry="27" fill="#005A9C"/>
            <ellipse cx="121.5" cy="46.5" rx="5.5" ry="6.5" fill="white"/>
            <ellipse cx="134.5" cy="62.5" rx="4.5" ry="4.5" fill="white"/>
            <ellipse cx="109.5" cy="66.5" rx="4.5" ry="4.5" fill="white"/>
            <ellipse cx="94" cy="74" rx="3" ry="3" fill="white"/>
            <ellipse cx="119" cy="84" rx="3" ry="3" fill="white"/>
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white ml-4">
          Gerenciando Mi Negocio
        </h1>
      </div>
    </header>
  );
};

export default Header;
