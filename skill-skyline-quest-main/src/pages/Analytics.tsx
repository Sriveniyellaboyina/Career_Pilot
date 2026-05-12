import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { skillsAnalytics, testScoreTrend } from "@/lib/mockData";

const applicationData = [
  { month: "Jan", applied: 4, interviews: 1 },
  { month: "Feb", applied: 6, interviews: 2 },
  { month: "Mar", applied: 9, interviews: 4 },
  { month: "Apr", applied: 12, interviews: 6 },
  { month: "May", applied: 15, interviews: 9 },
  { month: "Jun", applied: 18, interviews: 12 },
];

const pieData = [
  { name: "Verified", value: 8, color: "hsl(var(--primary))" },
  { name: "Pending", value: 2, color: "hsl(var(--warning))" },
];

const Analytics = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p className="text-muted-foreground mt-1">Deep dive into your career performance.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 lg:col-span-2">
        <h3 className="font-semibold mb-4">Applications vs Interviews</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={applicationData}>
            <defs>
              <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            <Area type="monotone" dataKey="applied" stroke="hsl(var(--primary))" fill="url(#a1)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="interviews" stroke="hsl(var(--primary-glow))" fill="url(#a2)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h3 className="font-semibold mb-4">Skill Verification</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4}>
              {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 text-xs mt-2">
          {pieData.map(d => (
            <div key={d.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              <span>{d.name} ({d.value})</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <h3 className="font-semibold mb-4">Score Growth</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={testScoreTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--primary))" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-semibold mb-4">Domain Strength</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={skillsAnalytics} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
            <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  </div>
);

export default Analytics;
