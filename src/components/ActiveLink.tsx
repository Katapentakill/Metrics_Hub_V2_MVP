// src/components/layout/ActiveLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void; 
}

export default function ActiveLink({ 
  href, 
  children, 
  className = '', 
  activeClassName = 'nav-link-active',
  onClick 
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ''}`}
      onClick={onClick} 
    >
      {children}
    </Link>
  );
}