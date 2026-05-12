import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Video, Code2, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const rounds = [
  { icon: MessageCircle, title: "HR & Behavioral", desc: "Cultural fit, communication, leadership", color: "from-pink-500 to-rose-500" },
  { icon: Code2, title: "Technical", desc: "Data structures, algorithms, system design", color: "from-blue-500 to-indigo-500" },
  { icon: Video, title: "Live Mock", desc: "Recorded interview with AI feedback", color: "from-violet-500 to-purple-500" },
];

const Interview = () => {
  const [recording, setRecording] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="text-xs uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> AI Interviewer
        </div>
        <h1 className="text-3xl font-bold mt-1">Mock Interview</h1>
        <p className="text-muted-foreground mt-1">Practice with our AI agent — receive instant, structured feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rounds.map((r, i) => (
          <motion.button
            key={r.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass-card p-6 text-left relative overflow-hidden"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${r.color} opacity-20`} />
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white mb-3`}>
              <r.icon className="w-5 h-5" />
            </div>
            <div className="font-semibold">{r.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{r.desc}</div>
          </motion.button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-10 flex flex-col items-center text-center">
        <motion.div
          animate={recording ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
          className={`w-28 h-28 rounded-full flex items-center justify-center glow-shadow ${recording ? "bg-destructive" : "bg-gradient-primary"}`}
        >
          <Mic className="w-12 h-12 text-primary-foreground" />
        </motion.div>
        <h3 className="font-semibold mt-6 text-lg">{recording ? "Listening…" : "Tap to start your mock interview"}</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          {recording
            ? "The AI is analyzing your tone, content, and clarity."
            : "Question 1 will appear once you begin. You can pause anytime."}
        </p>
        <Button onClick={() => setRecording(r => !r)} className="mt-6 bg-gradient-primary glow-shadow">
          {recording ? "Stop interview" : "Start interview"}
        </Button>
      </motion.div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-3">Last AI Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            { label: "Clarity", value: "92%" },
            { label: "Technical depth", value: "88%" },
            { label: "Confidence", value: "85%" },
          ].map(m => (
            <div key={m.label} className="bg-accent/40 rounded-xl p-4">
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="text-2xl font-bold gradient-text">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;
