import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, Loader2, GraduationCap, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractedResume } from "@/lib/mockData";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"idle" | "uploading" | "scanning" | "done">("idle");
  const [fileName, setFileName] = useState("");

  const handleFile = (file?: File) => {
    if (!file) return;
    setFileName(file.name);
    setStage("uploading");
    setTimeout(() => setStage("scanning"), 800);
    setTimeout(() => setStage("done"), 2400);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resume Upload</h1>
        <p className="text-muted-foreground mt-1">Drop your resume — we'll extract your skills, experience, and certifications.</p>
      </div>

      {stage === "idle" && (
        <motion.label
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          htmlFor="resume" className="glass-panel p-12 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors"
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center glow-shadow mb-4">
            <Upload className="w-9 h-9 text-primary-foreground" />
          </motion.div>
          <h3 className="text-xl font-semibold">Drag & drop your resume</h3>
          <p className="text-sm text-muted-foreground mt-1">PDF up to 10MB · or click to browse</p>
          <Button className="mt-5 bg-gradient-primary glow-shadow" type="button" onClick={(e) => { e.preventDefault(); document.getElementById("resume")?.click(); }}>
            Browse files
          </Button>
          <input id="resume" type="file" accept=".pdf" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </motion.label>
      )}

      <AnimatePresence>
        {(stage === "uploading" || stage === "scanning") && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card p-8 flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <motion.div className="absolute inset-0 rounded-xl border-2 border-primary" animate={{ scale: [1, 1.15, 1], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{fileName}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                {stage === "uploading" ? "Uploading…" : "AI scanning your resume…"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "done" && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-success" />
            <div className="flex-1">
              <div className="font-semibold">Resume parsed successfully</div>
              <div className="text-xs text-muted-foreground">{fileName}</div>
            </div>
            <Button onClick={() => navigate("/skills")} className="bg-gradient-primary glow-shadow">Continue to Skills →</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Personal Info</h3>
              <div className="space-y-1.5">
                <div className="text-2xl font-bold">{extractedResume.name}</div>
                <div className="text-sm text-muted-foreground">{extractedResume.email}</div>
                <div className="text-sm text-muted-foreground">{extractedResume.phone} · {extractedResume.location}</div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedResume.certifications.map(c => (
                  <span key={c} className="px-3 py-1.5 rounded-full bg-accent/60 text-xs font-medium text-accent-foreground">{c}</span>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Education</h3>
              </div>
              <div className="space-y-3">
                {extractedResume.education.map((e, i) => (
                  <div key={i}>
                    <div className="font-semibold text-sm">{e.degree}</div>
                    <div className="text-xs text-muted-foreground">{e.school} · {e.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Experience</h3>
              </div>
              <div className="space-y-3">
                {extractedResume.experience.map((e, i) => (
                  <div key={i}>
                    <div className="font-semibold text-sm">{e.role}</div>
                    <div className="text-xs text-muted-foreground">{e.company} · {e.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeUpload;
