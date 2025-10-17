import { PublicHeader } from '@/components/public-header';
import { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <PublicHeader />
      <main className="p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}