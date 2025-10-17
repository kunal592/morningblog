"use client"

import { type ReactNode } from "react";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { MainLayout } from "./main-layout";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider storageKey="narrato-theme" defaultTheme="system">
        <MainLayout>{children}</MainLayout>
        <Toaster />
    </ThemeProvider>
  );
}
