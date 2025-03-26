
import { ReactNode } from 'react';

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
}

export function BlurContainer({ children, className = '' }: BlurContainerProps) {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 ${className}`}
    >
      {children}
    </div>
  );
}
