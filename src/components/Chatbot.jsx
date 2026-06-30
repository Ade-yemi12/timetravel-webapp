import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendChatMessage } from "../lib/mistral.js";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Bienvenue chez **TimeTravel Agency** ! Je suis votre conseiller en voyages temporels. Posez-moi vos questions sur nos destinations : Paris 1889, le Crétacé ou Florence 1504 !",
};

// Convertit le markdown basique en JSX (gras, italique, sauts de ligne)
function renderMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part === "\n") {
      return <br key={i} />;
    }
    return part;
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (!apiKey) {
      setError("Clé API Mistral manquante. Ajoute VITE_MISTRAL_API_KEY dans ton fichier .env");
      return;
    }

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const reply = await sendChatMessage(
        newMessages.map(({ role, content }) => ({ role, content })),
        apiKey
      );
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setError("Une erreur est survenue. Vérifiez votre clé API et réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-ink flex items-center justify-center shadow-lg shadow-black/40 text-xl"
      >
        {open ? "✕" : "💬"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm h-[480px] bg-charcoal border border-cream/10 rounded-sm shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-ink px-5 py-4 border-b border-cream/10">
              <p className="font-display text-cream text-lg">Conseiller TimeTravel</p>
              <p className="font-body text-xs text-cream/50">Propulsé par Mistral AI</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-4 py-2.5 rounded-sm font-body text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-gold text-ink"
                      : "bg-ink/60 text-cream/90 border border-cream/10"
                  }`}
                >
                  {renderMarkdown(m.content)}
                </div>
              ))}
              {loading && (
                <div className="bg-ink/60 text-cream/60 border border-cream/10 max-w-[60%] px-4 py-2.5 rounded-sm font-body text-sm italic">
                  En train d&rsquo;écrire…
                </div>
              )}
              {error && (
                <p className="text-red-400 text-xs font-body px-1">{error}</p>
              )}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-cream/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez-moi vos questions…"
                className="flex-1 bg-ink/60 border border-cream/10 rounded-sm px-3 py-2 text-sm font-body text-cream placeholder:text-cream/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gold text-ink px-4 py-2 rounded-sm text-sm font-semibold disabled:opacity-50"
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
