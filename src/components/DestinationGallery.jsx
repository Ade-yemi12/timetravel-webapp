import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard.jsx";
import { destinations } from "../data/destinations.js";

export default function DestinationGallery({ onSelect }) {
  return (
    <section id="destinations" className="bg-ink py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-gold tracking-[0.3em] text-xs uppercase mb-4">
            Nos destinations
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">
            Trois époques, une seule promesse
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} onSelect={onSelect} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
