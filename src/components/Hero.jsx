import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/assets/paris-1889-hero.jpg"
      >
        <source src="/assets/timetravel-teaser.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />

      {/* Motif "portail temporel" signature, inspiré de l'identité de marque */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute -right-24 top-1/4 w-[480px] h-[480px] rounded-full border border-gold/30 pointer-events-none hidden lg:block"
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        className="absolute -right-10 top-1/4 w-[360px] h-[360px] rounded-full border border-gold/40 pointer-events-none hidden lg:block"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-body text-gold tracking-[0.3em] text-xs md:text-sm uppercase mb-6"
        >
          Explorez l&rsquo;histoire, réinventée
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl text-cream leading-tight mb-6"
        >
          Le temps est votre destination
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Trois époques. Une seule agence. Voyagez vers la Belle Époque
          parisienne, l&rsquo;aube des dinosaures, ou l&rsquo;âge d&rsquo;or
          florentin.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a
            href="#destinations"
            className="inline-block bg-gold text-ink font-body font-semibold px-8 py-4 rounded-sm tracking-wide hover:bg-cream transition-colors duration-300"
          >
            Découvrir les destinations
          </a>
        </motion.div>
      </div>
    </section>
  );
}
