"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Gamepad2,
  CalendarDays,
  Lightbulb,
  Users,
  User,
  Settings,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/games",
    label: "Jeux",
    icon: Gamepad2,
  },
  {
    href: "/events",
    label: "Événements",
    icon: CalendarDays,
  },
  {
    href: "/ideas",
    label: "Idées",
    icon: Lightbulb,
  },
  {
    href: "/members",
    label: "Membres",
    icon: Users,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: User,
  },
  {
    href: "/settings",
    label: "Paramètres",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 h-[calc(100vh-7rem)] w-72 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-10">
        <h1 className="text-3xl font-black">
          🎮 Chipies
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Plateforme communautaire
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={22} />

              <span className="font-medium">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <div className="rounded-2xl bg-white/5 p-4 text-center">
          <p className="text-sm text-gray-400">
            🚀 Version 2.0
          </p>

          <p className="mt-2 font-semibold">
            La Confrérie des Chipies
          </p>
        </div>
      </div>
    </aside>
  );
}