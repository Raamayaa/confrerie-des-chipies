"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Gamepad2,
  Calendar,
  Users,
  Lightbulb,
  Bell,
  Settings,
} from "lucide-react";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/games",
    label: "Jeux",
    icon: Gamepad2,
  },
  {
    href: "/admin/events",
    label: "Événements",
    icon: Calendar,
  },
  {
    href: "/admin/members",
    label: "Membres",
    icon: Users,
  },
  {
    href: "/admin/ideas",
    label: "Idées",
    icon: Lightbulb,
  },
  {
    href: "/admin/logs",
    label: "Logs",
    icon: Bell,
  },
  {
    href: "/admin/settings",
    label: "Paramètres",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-8 text-3xl font-black">
        👑 Admin
      </h2>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-violet-600/20"
            >
              <Icon size={20} />

              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}