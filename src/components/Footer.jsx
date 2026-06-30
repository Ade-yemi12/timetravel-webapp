export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-cream/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-cream/80 text-lg">
          TimeTravel <span className="text-gold italic">Agency</span>
        </p>
        <p className="font-body text-cream/40 text-xs text-center">
          Projet pédagogique — M1/M2 Digital &amp; IA. Voyages temporels fictifs,
          assets générés par IA.
        </p>
      </div>
    </footer>
  );
}
