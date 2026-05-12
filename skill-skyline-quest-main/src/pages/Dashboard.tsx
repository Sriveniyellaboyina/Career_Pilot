import { StatCard } from "@/components/StatCard";
import { FileCheck, ShieldCheck, TrendingUp, Briefcase, Bell, Sparkles, CalendarClock } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { skillsAnalytics, testScoreTrend, careerProgress, notifications, aiSuggestions, userProfile } from "@/lib/mockData";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {userProfile.name.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's the pulse of your career today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={FileCheck} label="Resume Score" value={`${userProfile.resumeScore}%`} trend="+5 this week" delay={0} />
        <StatCard icon={ShieldCheck} label="Verified Skills" value={userProfile.verifiedSkills} trend="+2 new" delay={0.05} />
        <StatCard icon={TrendingUp} label="Test Performance" value={`${userProfile.testPerformance}%`} trend="+8% improved" delay={0.1} />
        <StatCard icon={Briefcase} label="Recommended Jobs" value={userProfile.recommendedJobs} trend="6 trending" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Test Score Trend</h3>
              <p className="text-xs text-muted-foreground">Past 6 months performance</p>
            </div>
            <span className="text-xs text-success font-medium">+30 pts</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={testScoreTrend}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
          <h3 className="font-semibold mb-1">Skills Analytics</h3>
          <p className="text-xs text-muted-foreground mb-2">Strength across domains</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={skillsAnalytics}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 xl:col-span-2">
          <h3 className="font-semibold mb-1">Career Progress</h3>
          <p className="text-xs text-muted-foreground mb-4">Your journey from upload to offers</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={careerProgress}>
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="value" fill="url(#bg)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Notifications</h3>
            </div>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 rounded-full bg-gradient-primary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">AI Suggestions</h3>
            </div>
            <ul className="space-y-2">
              {aiSuggestions.map((s, i) => (
                <li key={i} className="text-sm bg-accent/50 rounded-lg p-3 leading-snug">{s}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <CalendarClock className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Upcoming Tests</h3>
            </div>
            <div className="space-y-2">
              {[
                { name: "AWS Verification", date: "Tomorrow · 3:00 PM" },
                { name: "System Design", date: "Fri · 11:00 AM" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/60">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.date}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
