'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function PageHeader() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const { user } = session;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        {/* Page title could go here */}
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 focus:outline-none">
              <Avatar className="h-9 w-9">
                {user.image && <AvatarImage src={user.image} alt={user.name} />}
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile" passHref>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link href="/dashboard" passHref>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <Link href="/settings" passHref>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
