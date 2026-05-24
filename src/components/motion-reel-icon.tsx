import React from 'react';

interface MotionReelIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

const MotionReelIcon: React.FC<MotionReelIconProps> = ({ size = 32, className = '', animated = true }) => {
  const style: React.CSSProperties = animated ? { animation: 'spin 6s linear infinite' } : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="motion reel icon"
    >
      <defs>
        <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
        <linearGradient id="mrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" stroke="url(#mrGrad)" strokeWidth="2" fill="none" />
      <circle cx="32" cy="32" r="8" fill="url(#mrGrad)" />
      <g fill="#60A5FA" opacity="0.8">
        <rect x="24" y="18" width="16" height="3" rx="1" />
        <rect x="24" y="28" width="16" height="3" rx="1" />
        <rect x="24" y="38" width="16" height="3" rx="1" />
      </g>
    </svg>
  );
};

export default MotionReelIcon;
