import { motion } from "framer-motion";

export default function DestinationCard({ destination, onSelect, index }) {
  return (
    <motion.button
      onClick={() => onSelect(destination)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative text-left rounded-sm overflow-hidden bg-charcoal border border-cream/10 focus-visible:outline-2 focus-visible:outline-gold"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.name} — ${destination.subtitle}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span
          className="absolute top-4 right-4 font-display italic text-sm px-3 py-1 rounded-full border"
          style={{ borderColor: destination.accent, color: destination.accent }}
        >
          {destination.year}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-cream mb-1">
          {destination.name}
        </h3>
        <p className="font-body text-sm text-cream/60 mb-3">
          {destination.subtitle}
        </p>
        <p className="font-body text-sm text-cream/80 italic mb-4">
          &ldquo;{destination.tagline}&rdquo;
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs text-cream/50">
            À partir de {destination.price} €
          </span>
          <span
            className="font-body text-sm font-medium group-hover:translate-x-1 transition-transform duration-300"
            style={{ color: destination.accent }}
          >
            Découvrir →
          </span>
        </div>
      </div>
    </motion.button>
  );
}
