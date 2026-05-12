import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { extractedResume, extractedSkills, userProfile } from "@/lib/mockData";
import { Edit3, FileText, ShieldCheck, Folder } from "lucide-react";

const projects = [
  { name: "AI Resume Parser", desc: "OCR + LLM extraction pipeline", tag: "Python" },
  { name: "Career Pilot", desc: "Skill verification SaaS", tag: "React" },
  { name: "JobMatch API", desc: "Embedding-based recommender", tag: "Node.js" },
];

const Profile = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="w-24 h-24">
        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">{userProfile.avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
        <p className="text-muted-foreground">{userProfile.title} · {extractedResume.location}</p>
        <p className="text-sm text-muted-foreground mt-1">{userProfile.email}</p>
        <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
          {extractedResume.certifications.map(c => (
            <span key={c} className="text-xs px-3 py-1 rounded-full bg-accent/60 text-accent-foreground font-medium">{c}</span>
          ))}
        </div>
      </div>
      <Button className="bg-gradient-primary glow-shadow"><Edit3 className="w-4 h-4 mr-1" /> Edit profile</Button>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Section title="Verified Skills" icon={ShieldCheck}>
        <div className="flex flex-wrap gap-2">
          {extractedSkills.filter(s => s.verified).map(s => (
            <span key={s.name} className="px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold">
              ✓ {s.name}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Education" icon={FileText}>
        {extractedResume.education.map((e, i) => (
          <div key={i} className="py-2">
            <div className="font-semibold text-sm">{e.degree}</div>
            <div className="text-xs text-muted-foreground">{e.school} · {e.year}</div>
          </div>
        ))}
      </Section>

      <Section title="Experience" icon={FileText}>
        {extractedResume.experience.map((e, i) => (
          <div key={i} className="py-2">
            <div className="font-semibold text-sm">{e.role}</div>
            <div className="text-xs text-muted-foreground">{e.company} · {e.period}</div>
          </div>
        ))}
      </Section>

      <Section title="Projects" icon={Folder}>
        {projects.map(p => (
          <div key={p.name} className="py-2 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.desc}</div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-accent/60 text-accent-foreground font-medium">{p.tag}</span>
          </div>
        ))}
      </Section>
    </div>
  </div>
);

const Section = ({ title, icon: Icon, children }: any) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-primary" />
      <h3 className="font-semibold">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export default Profile;
