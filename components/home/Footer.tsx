export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-gray-500">
      © {new Date().getFullYear()} Confrérie des chipies • Tous droits réservés.
    </footer>
  );
}