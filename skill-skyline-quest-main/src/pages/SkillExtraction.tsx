import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { extractedSkills } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  Technical: "from-blue-500 to-indigo-500",
  Cloud: "from-cyan-500 to-blue-500",
  Data: "from-violet-500 to-purple-500",
  Soft: "from-pink-500 to-rose-500",
};

const SkillExtraction = () => {
  const navigate = useNavigate();
  const verified = extractedSkills.filter(s => s.verified).length;
  const categories = Array.from(new Set(extractedSkills.map(s => s.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Extracted Skills</h1>
          <p className="text-muted-foreground mt-1">{extractedSkills.length} skills detected · {verified} verified</p>
        </div>
        <Button onClick={() => navigate("/verification")} className="bg-gradient-primary glow-shadow">
          Verify your skills <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {categories.map((cat, ci) => (
        <motion.section
          key={cat}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.08 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">{cat} Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {extractedSkills.filter(s => s.category === cat).map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: ci * 0.08 + i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass-card p-5 relative overflow-hidden"
              >
                <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br ${categoryColors[s.category]} opacity-20`} />
                <div className="flex items-start justify-between">
                  <div className="font-semibold">{s.name}</div>
                  {s.verified ? (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                      <ShieldAlert className="w-3 h-3" /> Pending
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-semibold">{s.confidence}%</span>
                  </div>
                  <Progress value={s.confidence} className="h-1.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default SkillExtraction;
