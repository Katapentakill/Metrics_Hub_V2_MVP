// src/modules/recruitment/shared/ErrorState.tsx
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorState({ error, onRetry, showRetry = true }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Something went wrong</h3>
      <p className="text-slate-600 mb-4 max-w-md">{error}</p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
}