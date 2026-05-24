import React from 'react';

interface CategoryPlaceholderProps {
  category: string;
  title?: string;
  className?: string;
}

export const CategoryPlaceholder: React.FC<CategoryPlaceholderProps> = ({
  category,
  title,
  className = '',
}) => {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gray-900 ${className}`}>
      <svg viewBox="0 0 200 200" width="160" height="160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={category}>
        <defs>
          <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="12" fill="url(#phGrad)" />
        <g fill="#fff" opacity="0.9">
          <circle cx="100" cy="70" r="20" opacity="0.14" />
          <path d="M60 140c8-18 36-18 48 0" fillOpacity="0.14" />
        </g>
        <text x="100" y="170" fontSize="12" textAnchor="middle" fill="#E5E7EB">{category}</text>
      </svg>
      <style jsx>{`
        .w-full{width:100%;}
        .h-full{height:100%;}
      `}</style>
    </div>
  );
};

export default CategoryPlaceholder;
