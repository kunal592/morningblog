
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Narrato',
  description: 'A premium blog platform for modern authors.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
              <div className="flex space-x-4">
                <Link href="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
                <Link href="/about" className="text-white hover:text-gray-300">
                  About
                </Link>
                <Link href="/contactus" className="text-white hover:text-gray-300">
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
