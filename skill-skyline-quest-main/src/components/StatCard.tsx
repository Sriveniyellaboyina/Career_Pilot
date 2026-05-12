import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  delay?: number;
  className?: string;
}

export const StatCard = ({ icon: Icon, label, value, trend, delay = 0, className }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -4 }}
    className={cn("glass-card p-6 relative overflow-hidden group", className)}
  >
    <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-primary opacity-10 group-hover:opacity-20 transition-opacity" />
    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 glow-shadow">
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
    <div className="text-3xl font-bold mt-1 gradient-text">{value}</div>
    {trend && <div className="text-xs text-success mt-1 font-medium">{trend}</div>}
  </motion.div>
);
