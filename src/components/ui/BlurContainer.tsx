
import { ReactNode } from 'react';

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
}

export function BlurContainer({ children, className = '' }: BlurContainerProps) {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 ${className}`}
      style={{
        boxShadow: "0 8px 16px rgba(0,0,0,0.05), 0 1px 5px rgba(0,0,0,0.03)",
        border: "1px solid rgba(255, 255, 255, 0.7)"
      }}
    >
      {children}
    </div>
  );
}
