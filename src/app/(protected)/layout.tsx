"use client"

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SiteSidebar } from '@/components/site-sidebar';
import { PageHeader } from '@/components/page-header';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SiteSidebar />
        <SidebarInset className="flex-1 flex flex-col !ml-0">
          <PageHeader />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 p-6 md:p-8"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
