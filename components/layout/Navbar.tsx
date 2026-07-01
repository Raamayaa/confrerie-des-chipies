"use client";

import Link from "next/link";
import { Gamepad2, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30">
            <Gamepad2 className="text-white" size={24} />
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

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-gray-300 transition-colors hover:text-violet-400"
          >
            Accueil
          </Link>

          <Link
            href="/events"
            className="text-gray-300 transition-colors hover:text-violet-400"
          >
            Événements
          </Link>

          <Link
            href="/games"
            className="text-gray-300 transition-colors hover:text-violet-400"
          >
            Jeux
          </Link>

          <Link
            href="/ideas"
            className="text-gray-300 transition-colors hover:text-violet-400"
          >
            Idées
          </Link>

          <Link
            href="/profile"
            className="text-gray-300 transition-colors hover:text-violet-400"
          >
            Profil
          </Link>
        </nav>

        {/* Connexion Discord */}
        <button
          onClick={() => signIn("discord")}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500"
        >
          <LogIn size={18} />
          Se connecter
        </button>
      </div>
    </header>
  );
}