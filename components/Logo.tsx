import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'icon' | 'watermark';
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = 'icon' }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ 
        opacity: variant === 'watermark' ? 0.05 : 1 
      }}
    >
      {/* 
        EthicalCode Circuit Key Logo 
        Symbolizes unlocking knowledge (Key) and digital systems (Circuit).
      */}
      <path 
        d="M 75 25 L 35 25 L 15 50 L 35 75 L 75 75" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="40" 
        cy="50" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="6"
      />
      <path 
        d="M 50 50 L 85 50" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <path 
        d="M 68 50 L 68 62" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <path 
        d="M 78 50 L 78 58" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;