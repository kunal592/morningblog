"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Home,
  Info,
  LayoutDashboard,
  Mail,
  PenSquare,
  Rss,
  Settings,
  Shield,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { Separator } from "./ui/separator"

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/feed", icon: Rss, label: "Feed" },
  { href: "/postblog", icon: PenSquare, label: "Write" },
];

const secondaryNavItems = [
  { href: "/about", icon: Info, label: "About" },
  { href: "/contactus", icon: Mail, label: "Contact Us" },
];

const userNavItems = [
  { href: "/notification", icon: Bell, label: "Notifications" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/admin", icon: Shield, label: "Admin" },
];


export function SiteSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/home" className="flex items-center gap-2">
           <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-primary"
              fill="currentColor"
            >
              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v10h2V7H7zm4 0v10h2V7h-2zm4 0v10h2V7h-2z" />
            </svg>
          <span className="font-bold text-xl text-foreground group-data-[collapsible=icon]:hidden">
            Narrato
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <Separator className="my-2" />

        <SidebarMenu>
          {secondaryNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <Separator className="my-2" />
        
        <SidebarMenu>
          {userNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarContent>

      <SidebarFooter className="p-2">
         <div className="flex justify-center group-data-[collapsible=icon]:justify-center">
            <ThemeToggle />
         </div>
      </SidebarFooter>
    </Sidebar>
  )
}
