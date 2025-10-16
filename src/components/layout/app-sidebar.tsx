"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  Settings,
  Megaphone,
  BarChart3,
  Bell,
  Zap,
  Plug,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AppSidebarProps {
  orgSlug: string;
}

const navigation = [
  { name: "Overview", href: "/overview", icon: BarChart3 },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Connections", href: "/connections", icon: Plug },
  { name: "Rules", href: "/rules", icon: Bell },
  { name: "Integrations", href: "/integrations", icon: Zap },
];

const settingsNav = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar({ orgSlug }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-4">
        <Link href={`/${orgSlug}/overview`} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <span className="font-mono text-sm font-bold">AX</span>
          </div>
          <span className="font-semibold">AdsX</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const href = `/${orgSlug}${item.href}`;
          const isActive = pathname === href || pathname?.startsWith(href + "/");

          return (
            <Link
              key={item.name}
              href={href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-4 w-4 flex-shrink-0",
                  isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2 pb-4">
        <Separator className="mb-2" />
        {settingsNav.map((item) => {
          const href = `/${orgSlug}${item.href}`;
          const isActive = pathname?.startsWith(href);

          return (
            <Link
              key={item.name}
              href={href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-4 w-4 flex-shrink-0",
                  isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
