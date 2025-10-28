// src/components/Sidebar.tsx
'use client';

import { useSidebar } from '@/contexts/SidebarContext';
import { Menu } from 'lucide-react';

export default function Sidebar() {
  const { isCollapsed, toggle } = useSidebar(); // ✅ Usar isCollapsed

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64' // ✅ isCollapsed, no isOpen
      }`}
    >
      <button
        onClick={toggle}
        className="p-4 hover:bg-gray-100 w-full"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {/* Tu contenido del menú aquí */}
      <nav className={`${isCollapsed && 'hidden'}`}> {/* ✅ isCollapsed */}
        {/* Items del menú */}
      </nav>
    </aside>
  );
}