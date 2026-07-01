export default function WhyJoin() {
  const features = [
    {
      title: "Événements organisés",
      text: "Ne rate plus aucune soirée gaming grâce au calendrier de la communauté.",
    },
    {
      title: "Vote pour les jeux",
      text: "Propose tes idées et participe aux décisions de la communauté.",
    },
    {
      title: "Communauté active",
      text: "Retrouve les membres facilement et rejoins les sessions en un clic.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <h2 className="text-5xl font-black mb-12">
        💜 Pourquoi rejoindre la Confrérie ?
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h3 className="text-2xl font-bold">{feature.title}</h3>

            <p className="mt-4 text-gray-400">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}