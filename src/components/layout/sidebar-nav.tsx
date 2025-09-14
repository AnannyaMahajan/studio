'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Bell,
  GraduationCap,
  Droplets,
  Calendar,
  Settings,
  Sparkles,
  FileQuestion,
} from 'lucide-react';

const mainNavItems = [
  { href: '/', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/report', label: 'New Report', icon: <FileQuestion /> },
  { href: '/report', label: 'AI Prediction', icon: <Sparkles /> },
  { href: '/alerts', label: 'Alerts', icon: <Bell /> },
  { href: '/education', label: 'Education', icon: <GraduationCap /> },
  { href: '/water-quality', label: 'Water Quality', icon: <Droplets /> },
];

const secondaryNavItems = [
  { href: '/schedule', label: 'Schedule', icon: <Calendar /> },
  { href: '/settings', label: 'Settings', icon: <Settings /> },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu className="flex flex-col h-full p-2">
      <div className="flex-1">
        {mainNavItems.map((item) => (
          <SidebarMenuItem key={item.href + item.label}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={item.href}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </div>
      <div>
        <SidebarSeparator className="my-2" />
        {secondaryNavItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={item.href}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </div>
    </SidebarMenu>
  );
}
