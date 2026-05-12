import { useState } from "react";
import { motion } from "framer-motion";
import { jobs } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, DollarSign, Search, Flame } from "lucide-react";

const Jobs = () => {
  const [q, setQ] = useState("");
  const filtered = jobs.filter(j => (j.title + j.company + j.tags.join(" ")).toLowerCase().includes(q.toLowerCase()));
  const trending = jobs.filter(j => j.trending);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Recommended Jobs</h1>
        <p className="text-muted-foreground mt-1">Personalized matches based on your verified skills.</p>
      </div>

      <div className="glass-card p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by role, company, or skill" className="border-0 bg-transparent focus-visible:ring-0" />
      </div>

      {trending.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-warning" />
            <h2 className="font-semibold">Trending now</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {trending.map((j, i) => <JobCard key={j.title} job={j} delay={i * 0.05} />)}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-semibold mb-3">All matches ({filtered.length})</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((j, i) => <JobCard key={j.title} job={j} delay={i * 0.05} />)}
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    whileHover={{ y: -4 }}
    className="glass-card p-6 flex flex-col gap-4"
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
        {job.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight">{job.title}</h3>
            <div className="text-sm text-muted-foreground">{job.company}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Match</div>
            <div className="font-bold gradient-text">{job.match}%</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
          <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {job.tags.map((t: string) => (
        <span key={t} className="text-[10px] font-medium px-2 py-1 rounded-full bg-accent/60 text-accent-foreground">{t}</span>
      ))}
    </div>
    <div className="flex gap-2">
      <Button className="flex-1 bg-gradient-primary glow-shadow">Apply now</Button>
      <Button variant="outline" size="icon" className="bg-white/60"><Bookmark className="w-4 h-4" /></Button>
    </div>
  </motion.div>
);

export default Jobs;
