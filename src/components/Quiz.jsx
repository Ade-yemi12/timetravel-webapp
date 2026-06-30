import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { destinations } from "../data/destinations.js";

const QUESTIONS = [
  {
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culturelle et artistique", scores: { "florence-1504": 2, "paris-1889": 1 } },
      { label: "Aventure et nature", scores: { cretace: 2 } },
      { label: "Élégance et raffinement", scores: { "paris-1889": 2, "florence-1504": 1 } },
    ],
  },
  {
    question: "Votre période préférée ?",
    options: [
      { label: "Histoire moderne (XIXe-XXe siècle)", scores: { "paris-1889": 2 } },
      { label: "Temps anciens et origines", scores: { cretace: 2 } },
      { label: "Renaissance et classicisme", scores: { "florence-1504": 2 } },
    ],
  },
  {
    question: "Vous préférez :",
    options: [
      { label: "L'effervescence urbaine", scores: { "paris-1889": 2 } },
      { label: "La nature sauvage", scores: { cretace: 2 } },
      { label: "L'art et l'architecture", scores: { "florence-1504": 2 } },
    ],
  },
  {
    question: "Votre activité idéale :",
    options: [
      { label: "Visiter des monuments", scores: { "paris-1889": 1, "florence-1504": 2 } },
      { label: "Observer la faune", scores: { cretace: 2 } },
      { label: "Explorer des musées", scores: { "florence-1504": 2 } },
    ],
  },
];

export default function Quiz({ onSelectDestination }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  function handleAnswer(option) {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([id, pts]) => {
      newScores[id] = (newScores[id] || 0) + pts;
    });
    setScores(newScores);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const winnerId = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(destinations.find((d) => d.id === winnerId));
    }
  }

  function reset() {
    setStep(0);
    setScores({});
    setResult(null);
  }

  function handleDiscover() {
    // Scroll vers la galerie, puis ouvre la modale de détail pour cette destination
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      onSelectDestination(result);
    }, 600);
  }

  return (
    <section id="quiz" className="bg-charcoal py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-body text-gold tracking-[0.3em] text-xs uppercase mb-4">
            Trouvez votre époque
          </p>
          <h2 className="font-display text-4xl text-cream">
            Quelle destination vous correspond ?
          </h2>
        </motion.div>

        <div className="bg-ink border border-cream/10 rounded-sm p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-body text-cream/50 text-xs mb-2">
                  Question {step + 1} / {QUESTIONS.length}
                </p>
                <div className="w-full bg-cream/10 h-1 rounded-full mb-6">
                  <div
                    className="bg-gold h-1 rounded-full transition-all duration-500"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <h3 className="font-display text-2xl text-cream mb-8">
                  {QUESTIONS[step].question}
                </h3>
                <div className="space-y-3">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left font-body text-cream/90 bg-charcoal border border-cream/10 rounded-sm px-5 py-4 hover:border-gold hover:text-gold transition-colors duration-300"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="font-body text-gold tracking-[0.3em] text-xs uppercase mb-4">
                  Votre destination idéale
                </p>
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-56 object-cover rounded-sm mb-6"
                />
                <h3 className="font-display text-3xl text-cream mb-2">{result.name}</h3>
                <p className="font-body text-cream/70 mb-2 italic">{result.tagline}</p>
                <p className="font-body text-cream/50 text-sm mb-8">
                  Cliquez sur "Découvrir" pour voir tous les détails et réserver.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleDiscover}
                    className="bg-gold text-ink font-body font-semibold px-6 py-3 rounded-sm hover:bg-cream transition-colors duration-300"
                  >
                    Découvrir cette destination →
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="font-body text-cream/60 px-6 py-3 hover:text-cream transition-colors duration-300"
                  >
                    Refaire le quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
