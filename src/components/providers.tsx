"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider storageKey="narrato-theme" defaultTheme="system">
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
