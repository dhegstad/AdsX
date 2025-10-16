"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Building2, Users, CreditCard, Shield, Plug } from "lucide-react";

interface SettingsNavProps {
  orgSlug: string;
}

const settingsNav = [
  {
    name: "General",
    href: "/settings/general",
    icon: Building2,
  },
  {
    name: "Members",
    href: "/settings/members",
    icon: Users,
  },
  {
    name: "Billing",
    href: "/settings/billing",
    icon: CreditCard,
  },
  {
    name: "Security",
    href: "/settings/security",
    icon: Shield,
  },
  {
    name: "Integrations",
    href: "/settings/integrations",
    icon: Plug,
  },
];

export function SettingsNav({ orgSlug }: SettingsNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-1 border-b">
      {settingsNav.map((item) => {
        const href = `/${orgSlug}${item.href}`;
        const isActive = pathname === href;

        return (
          <Link
            key={item.name}
            href={href}
            className={cn(
              "flex items-center border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
