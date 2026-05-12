import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const presets = [
  "How do I improve my resume score?",
  "Which skills should I verify next?",
  "Find me remote React roles",
];

const responses: Record<string, string> = {
  default: "I can help you with resume tips, skill verification, and job matching. Try one of the suggestions below!",
  resume: "Boost your resume score by adding measurable impact (e.g. 'reduced load time by 40%') and a portfolio link.",
  skills: "Verifying AWS would unlock 12 more matches. Want me to start the test?",
  jobs: "I see 6 strong remote React roles matching your verified skills. Visit the Jobs page to apply.",
};

export const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Hi! I'm Pilot, your AI career assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: "user", text }]);
    setInput("");
    const lower = text.toLowerCase();
    const reply = lower.includes("resume") ? responses.resume
      : lower.includes("skill") ? responses.skills
      : lower.includes("job") || lower.includes("react") ? responses.jobs
      : responses.default;
    setTimeout(() => setMessages(m => [...m, { role: "ai", text: reply }]), 600);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center glow-shadow text-primary-foreground"
        aria-label="Open AI assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass-panel overflow-hidden flex flex-col"
            style={{ height: 480 }}
          >
            <div className="p-4 border-b border-border/60 flex items-center gap-2 bg-gradient-primary">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <div className="text-primary-foreground">
                <div className="font-semibold text-sm">Pilot AI</div>
                <div className="text-[10px] opacity-90">Your career assistant</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-white/80 border border-border/60"
                  }`}>{m.text}</div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="p-3 border-t border-border/60 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {presets.map(p => (
                  <button key={p} onClick={() => send(p)} className="text-[10px] px-2 py-1 rounded-full bg-accent/60 text-accent-foreground hover:bg-accent">{p}</button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="flex-1 bg-white/70 border border-border/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button type="submit" className="w-9 h-9 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
