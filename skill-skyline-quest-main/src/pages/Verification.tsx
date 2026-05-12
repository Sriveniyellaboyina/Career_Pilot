import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { mockQuestions } from "@/lib/mockData";

const Verification = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [time, setTime] = useState(15 * 60);

  useEffect(() => {
    const t = setInterval(() => setTime(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const q = mockQuestions[current];
  const mins = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");

  const submit = () => {
    let score = 0;
    mockQuestions.forEach((q, i) => { if (answers[i] === q.answer) score++; });
    sessionStorage.setItem("testScore", JSON.stringify({ score, total: mockQuestions.length, answers }));
    navigate("/results");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> AI-Generated Test
          </div>
          <h1 className="text-3xl font-bold mt-1">Skill Verification</h1>
        </div>
        <div className="glass-card px-5 py-3 flex items-center gap-3">
          <Clock className="w-4 h-4 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Time left</div>
            <div className="font-bold tabular-nums">{mins}:{secs}</div>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground">Question {current + 1} of {mockQuestions.length}</span>
          <span className="font-semibold">{Math.round(((current + 1) / mockQuestions.length) * 100)}%</span>
        </div>
        <Progress value={((current + 1) / mockQuestions.length) * 100} className="h-1.5" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="glass-card p-8"
        >
          <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full mb-3">
            {q.skill}
          </span>
          <h2 className="text-xl font-semibold leading-snug">{q.question}</h2>
          <div className="grid gap-3 mt-6">
            {q.options.map((opt, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers(prev => ({ ...prev, [current]: i }))}
                  className={`text-left px-5 py-4 rounded-xl border-2 transition-all ${
                    selected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-white/60 hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="bg-white/60">
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        <div className="flex gap-1.5">
          {mockQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                i === current ? "bg-gradient-primary text-primary-foreground" :
                answers[i] !== undefined ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >{i + 1}</button>
          ))}
        </div>
        {current === mockQuestions.length - 1 ? (
          <Button onClick={submit} className="bg-gradient-primary glow-shadow">Submit test</Button>
        ) : (
          <Button onClick={() => setCurrent(c => c + 1)} className="bg-gradient-primary glow-shadow">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Verification;
