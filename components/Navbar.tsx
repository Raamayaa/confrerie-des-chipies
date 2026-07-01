"use client";

import { Menu, Gamepad2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500">

            <Gamepad2 size={24} />

          </div>

          <div>

            <h1 className="text-xl font-black">
              Confrérie des chipies
            </h1>

            <p className="text-xs text-gray-400">
              Communauté Gaming Chill
            </p>

          </div>

        </div>

        <nav className="hidden gap-8 md:flex">

          <a className="hover:text-violet-400 transition" href="#">
            Accueil
          </a>

          <a className="hover:text-violet-400 transition" href="#">
            Événements
          </a>

          <a className="hover:text-violet-400 transition" href="#">
            Jeux
          </a>

          <a className="hover:text-violet-400 transition" href="#">
            Idées
          </a>

        </nav>

        <button className="rounded-xl bg-violet-600 p-3 md:hidden">
          <Menu />
        </button>

      </div>
    </header>
  );
}