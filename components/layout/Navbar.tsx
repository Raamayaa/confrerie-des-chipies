"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Bell,
  Bug,
  Users,
  Gamepad2,
  Lightbulb,
  CalendarDays,
  ShoppingBag,
  Trophy,
  User,
  LogIn,
  LogOut,
} from "lucide-react";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function Navbar() {
  const {
    data: session,
    status,
  } = useSession();

  console.log("STATUS :", status);
  console.log("SESSION :", session);

  if (status === "loading") {
    return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-violet-500/30" />

            <div>
              <div className="h-5 w-48 animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-3 w-32 animate-pulse rounded bg-white/10" />
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Chargement...
          </div>
        </div>
      </header>
    );
  }

  const user = session?.user;
  console.log("USER :", user);
console.log("COINS :", user?.coins);
console.log("IMAGE :", user?.image);
console.log("NAME :", user?.name);

  const links = [
    {
      href: "/",
      label: "Accueil",
    },
    {
      href: "/events",
      label: "Événements",
      icon: CalendarDays,
    },
    {
      href: "/games",
      label: "Jeux",
      icon: Gamepad2,
    },
    {
      href: "/members",
      label: "Membres",
      icon: Users,
    },
    {
      href: "/leaderboard",
      label: "Classement",
      icon: Trophy,
    },
    {
      href: "/ideas",
      label: "Idées",
      icon: Lightbulb,
    },
    {
      href: "/shop",
      label: "Boutique",
      icon: ShoppingBag,
    },
    {
      href: "/achievements",
      label: "Succès",
      icon: Trophy,
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30">
            <Gamepad2
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-lg font-black text-white">
              Confrérie des Chipies
            </h1>

            <p className="text-xs text-gray-400">
              Communauté Gaming Chill
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-gray-300 transition-colors hover:text-violet-400"
              >
                {Icon && (
                  <Icon className="h-4 w-4" />
                )}

                {link.label}
              </Link>
            );
          })}

          {user && (
            <Link
              href="/profile"
              className="flex items-center gap-2 text-gray-300 transition-colors hover:text-violet-400"
            >
              <User className="h-4 w-4" />
              Profil
            </Link>
          )}
        </nav>

        {user ? (
          <div className="flex items-center gap-4">

            <Link
              href="/ideas"
              className="hidden items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 lg:flex"
            >
              <Bug className="h-4 w-4" />
              Bug / Idée
            </Link>

            <Link
              href="/notifications"
              className="relative rounded-xl p-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            <div className="hidden rounded-full bg-yellow-500/10 px-4 py-2 font-bold text-yellow-400 lg:block">
              🪙 {(user.coins ?? 0).toLocaleString("fr-FR")}
            </div>

            {user?.image && (
              <Image
                src={user.image}
                alt={user.name ?? "Avatar"}
                width={44}
                height={44}
                className="rounded-full border-2 border-violet-500"
              />
            )}

            <div className="hidden text-right lg:block">
              <p className="font-semibold text-white">
                {user.name}
              </p>

              <p className="text-xs text-gray-400">
                Connecté avec Discord
              </p>
            </div>

            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
            >
              <LogOut size={18} />
              Déconnexion
            </button>

          </div>
        ) : (
          <button
            onClick={() =>
              signIn("discord", {
                callbackUrl: "/profile",
              })
            }
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            <LogIn size={18} />
            Se connecter
          </button>
        )}
      </div>
    </header>
  );
}