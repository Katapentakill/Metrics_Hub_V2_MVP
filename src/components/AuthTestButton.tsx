'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import AuthTestPanel from './AuthTestPanel';

export default function DemoControlsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
        title="Demo Controls (Admin Only)"
      >
        <Settings className="w-5 h-5" />
      </button>
      
      <AuthTestPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
