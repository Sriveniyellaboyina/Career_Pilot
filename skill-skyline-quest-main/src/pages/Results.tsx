import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { mockQuestions } from "@/lib/mockData";
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

const Results = () => {
  const navigate = useNavigate();
  const stored = useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem("testScore") || "null"); } catch { return null; }
  }, []);
  const answers: Record<number, number> = stored?.answers ?? {};

  const skillScores = useMemo(() => {
    const map: Record<string, { correct: number; total: number }> = {};
    mockQuestions.forEach((q, i) => {
      map[q.skill] = map[q.skill] || { correct: 0, total: 0 };
      map[q.skill].total += 1;
      if (answers[i] === q.answer) map[q.skill].correct += 1;
    });
    return Object.entries(map).map(([skill, v]) => ({
      skill,
      score: Math.round((v.correct / v.total) * 100),
      verified: v.correct / v.total >= 0.6,
    }));
  }, [answers]);

  const overall = Math.round(skillScores.reduce((a, b) => a + b.score, 0) / Math.max(1, skillScores.length));
  const circ = 2 * Math.PI * 54;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Your Results</h1>
        <p className="text-muted-foreground mt-1">AI-evaluated skill performance & recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="-rotate-90 w-40 h-40">
              <circle cx="80" cy="80" r="54" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
              <motion.circle
                cx="80" cy="80" r="54" stroke="url(#grad)" strokeWidth="12" fill="none" strokeLinecap="round"
                initial={{ strokeDasharray: `0 ${circ}` }}
                animate={{ strokeDasharray: `${(overall / 100) * circ} ${circ}` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold gradient-text">{overall}%</div>
              <div className="text-xs text-muted-foreground">Overall</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-4 text-center">Excellent performance — you're ready for senior roles.</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Skill-wise Score</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={skillScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="score" radius={[10, 10, 0, 0]}>
                {skillScores.map((s, i) => (
                  <Cell key={i} fill={s.verified ? "hsl(var(--primary))" : "hsl(var(--warning))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="font-semibold mb-4">Verified Skills</h3>
          <div className="space-y-2">
            {skillScores.map(s => (
              <div key={s.skill} className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-border/60">
                <div className="flex items-center gap-2">
                  {s.verified ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-warning" />}
                  <span className="font-medium">{s.skill}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.verified ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {s.verified ? "Verified" : "Needs Improvement"} · {s.score}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">AI Feedback</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="bg-accent/40 p-3 rounded-xl">Your React and TypeScript fundamentals are excellent — apply for senior frontend roles.</li>
            <li className="bg-accent/40 p-3 rounded-xl">Brush up on AWS Lambda + S3 — practicing 2 hands-on labs will boost confidence.</li>
            <li className="bg-accent/40 p-3 rounded-xl">Consider taking the System Design verification to unlock principal-level matches.</li>
          </ul>
          <Button onClick={() => navigate("/jobs")} className="w-full mt-5 bg-gradient-primary glow-shadow">
            See your job matches <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
