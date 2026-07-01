"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToEvents = () => {
    document
      .getElementById("events")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
          🎮 Bienvenue dans la Confrérie
        </div>

        <h1 className="mt-8 text-6xl font-black md:text-8xl">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
            Confrérie des Chipies
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
          Organisez vos soirées, découvrez les prochains jeux,
          votez pour les événements et rejoignez vos amis
          en quelques clics.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={scrollToEvents}
            className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-violet-500"
          >
            📅 Voir les événements
          </button>

          <a
            href="https://discord.gg/TON-LIEN"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-violet-500 px-8 py-4 transition-all duration-300 hover:bg-violet-500/10"
          >
            🚀 Rejoindre Discord
          </a>
        </div>
      </motion.div>
    </section>
  );
}