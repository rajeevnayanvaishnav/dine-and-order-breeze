
import { ReactNode } from 'react';

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
}

export function BlurContainer({ children, className = '' }: BlurContainerProps) {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 ${className}`}
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)",
        border: "1px solid rgba(255, 255, 255, 0.7)"
      }}
    >
      {children}
    </div>
  );
}
