
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardEdit,
  Users,
  BarChart3,
  Settings,
  TreeDeciduous,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { UserRole } from '@/types';
import { getCurrentUserRole } from '@/types'; // Import the role checker
import { useEffect, useState } from 'react';


const allNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Worker'] as UserRole[] },
  { href: '/admin/work-log', label: 'Work Log', icon: ClipboardEdit, badge: 'New', roles: ['Admin', 'Manager', 'Worker'] as UserRole[] },
  { href: '/admin/attendance', label: 'Attendance', icon: Users, roles: ['Admin', 'Manager'] as UserRole[] },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3, roles: ['Admin', 'Manager'] as UserRole[] },
];

const settingsItem = { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['Admin'] as UserRole[] };

export function SidebarNav() {
  const pathname = usePathname();
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Worker');

  useEffect(() => {
    setCurrentUserRole(getCurrentUserRole());
  }, []);

  const visibleNavItems = allNavItems.filter(item => item.roles.includes(currentUserRole));
  const canViewSettings = settingsItem.roles.includes(currentUserRole);

  return (
    <>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary-foreground transition-colors">
          <TreeDeciduous className="h-8 w-8 text-sidebar-primary" />
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">TimberOps</span>
        </Link>
      </SidebarHeader>

      <SidebarMenu className="flex-1 p-2">
        {visibleNavItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              variant="default"
              size="default"
              isActive={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))}
              tooltip={{ children: item.label, className: "bg-primary text-primary-foreground" }}
              className={cn(
                "justify-start",
                (pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))) 
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden flex-1">{item.label}</span>
                {item.badge && <Badge variant="secondary" className="ml-auto group-data-[collapsible=icon]:hidden bg-accent text-accent-foreground">{item.badge}</Badge>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      
      {canViewSettings && (
        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                variant="default"
                size="default"
                isActive={pathname.startsWith(settingsItem.href)}
                tooltip={{ children: settingsItem.label, className: "bg-primary text-primary-foreground" }}
                className={cn(
                  "justify-start",
                  pathname.startsWith(settingsItem.href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Link href={settingsItem.href}>
                  <settingsItem.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{settingsItem.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </>
  );
}
