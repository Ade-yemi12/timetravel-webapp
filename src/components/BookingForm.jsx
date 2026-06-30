import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { destinations } from "../data/destinations.js";

export default function BookingForm({ preselected }) {
  const [destinationId, setDestinationId] = useState(preselected?.id || destinations[0].id);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Date minimale = aujourd'hui
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (preselected) setDestinationId(preselected.id);
  }, [preselected]);

  const selected = destinations.find((d) => d.id === destinationId);

  function handleDateChange(e) {
    const val = e.target.value;
    setDate(val);
    if (val && val < today) {
      setDateError("La date de départ ne peut pas être dans le passé.");
    } else {
      setDateError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !date) return;
    if (date < today) {
      setDateError("La date de départ ne peut pas être dans le passé.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <section id="booking" className="bg-ink py-24 md:py-32">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-body text-gold tracking-[0.3em] text-xs uppercase mb-4">
            Réservation
          </p>
          <h2 className="font-display text-4xl text-cream">
            Planifiez votre voyage temporel
          </h2>
        </motion.div>

        <div className="bg-charcoal border border-cream/10 rounded-sm p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6"
            >
              <p className="font-display text-2xl text-gold mb-3">Demande envoyée !</p>
              <p className="font-body text-cream/70 mb-1">
                {name}, votre départ pour <strong>{selected.name}</strong> le{" "}
                {new Date(date + "T12:00:00").toLocaleDateString("fr-FR")} est en cours de
                préparation.
              </p>
              <p className="font-body text-cream/50 text-sm">
                Notre conseiller temporel vous recontactera sous 48h.
              </p>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setDate(""); setName(""); }}
                className="mt-6 font-body text-sm text-gold hover:text-cream transition-colors duration-300"
              >
                Faire une nouvelle réservation
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-body text-sm text-cream/70 mb-2">
                  Destination
                </label>
                <select
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  className="w-full bg-ink border border-cream/10 rounded-sm px-4 py-3 text-cream font-body focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.price} €
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-body text-sm text-cream/70 mb-2">
                  Votre nom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jean Dupont"
                  className="w-full bg-ink border border-cream/10 rounded-sm px-4 py-3 text-cream font-body placeholder:text-cream/30 focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-cream/70 mb-2">
                  Date de départ souhaitée
                </label>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={handleDateChange}
                  required
                  className={`w-full bg-ink border rounded-sm px-4 py-3 text-cream font-body focus:outline-none focus-visible:outline-2 focus-visible:outline-gold ${
                    dateError ? "border-crimson" : "border-cream/10"
                  }`}
                />
                {dateError && (
                  <p className="font-body text-crimson text-xs mt-1">{dateError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={!!dateError}
                className="w-full bg-gold text-ink font-body font-semibold px-6 py-3.5 rounded-sm hover:bg-cream transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirmer la demande de réservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
