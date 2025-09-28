// src/modules/recruitment/shared/LoadingState.tsx
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ message = 'Loading candidates...', size = 'md' }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClasses[size]} text-slate-500`}>
      <Loader2 className="h-8 w-8 animate-spin mb-2" />
      <p>{message}</p>
    </div>
  );
}
