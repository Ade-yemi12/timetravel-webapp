import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Destinations", href: "#destinations" },
    { label: "Trouvez votre époque", href: "#quiz" },
    { label: "Réserver", href: "#booking" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/90 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="font-display text-xl tracking-wide text-cream">
            TimeTravel
          </span>
          <span className="text-gold font-display italic text-xl">Agency</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-cream/80 hover:text-gold transition-colors duration-300 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
