import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function DestinationDetail({ destination, onClose, onBook }) {
  // Fermeture avec la touche Escape
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-charcoal max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-sm border border-cream/10 relative"
          >
            {/* Bouton fermer HORS de l'image, en position sticky en haut de la modale */}
            <div className="sticky top-0 z-10 flex justify-end px-4 pt-4">
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-charcoal border border-cream/20 text-cream hover:bg-gold hover:text-ink hover:border-gold transition-colors duration-300 shadow-lg"
              >
                ✕
              </button>
            </div>

            <div className="relative h-64 md:h-72 -mt-[52px]">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            </div>

            <div className="p-8">
              <p
                className="font-body text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: destination.accent }}
              >
                {destination.year}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-cream mb-2">
                {destination.name}
              </h3>
              <p className="font-body text-cream/60 mb-6">{destination.subtitle}</p>
              <p className="font-body text-cream/80 leading-relaxed mb-4">
                {destination.description}
              </p>
              {destination.details && (
                <div className="space-y-4 mb-6">
                  {destination.details.map((section) => (
                    <div key={section.title}>
                      <p className="font-body text-xs text-gold tracking-widest uppercase mb-1">
                        {section.title}
                      </p>
                      <p className="font-body text-cream/70 text-sm leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {destination.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-body text-xs px-3 py-1.5 rounded-full border border-cream/20 text-cream/70"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-cream/10 pt-6">
                <span className="font-display text-2xl text-cream">
                  {destination.price} €{" "}
                  <span className="font-body text-sm text-cream/50">/ voyageur</span>
                </span>
                <button
                  onClick={() => onBook(destination)}
                  className="bg-gold text-ink font-body font-semibold px-6 py-3 rounded-sm hover:bg-cream transition-colors duration-300"
                >
                  Réserver ce voyage
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
