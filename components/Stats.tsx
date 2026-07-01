"use client";

import { Users, Gamepad2, CalendarDays, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "46",
    label: "Membres",
  },
  {
    icon: Gamepad2,
    value: "18",
    label: "Jeux",
  },
  {
    icon: CalendarDays,
    value: "9",
    label: "Événements",
  },
  {
    icon: Lightbulb,
    value: "32",
    label: "Idées",
  },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-10">
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <Icon className="mb-4 text-violet-400" size={32} />

              <h3 className="text-3xl font-bold">{item.value}</h3>

              <p className="text-gray-400">
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}