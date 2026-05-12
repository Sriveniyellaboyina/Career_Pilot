import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bell, Lock, Palette, ShieldCheck } from "lucide-react";

const Settings = () => (
  <div className="space-y-6 max-w-3xl mx-auto">
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-1">Manage your preferences and account security.</p>
    </div>

    <Section icon={Bell} title="Notifications">
      {[
        ["Job match alerts", true],
        ["Test reminders", true],
        ["Weekly progress emails", false],
        ["Interview invites", true],
      ].map(([label, val]) => (
        <Row key={label as string} label={label as string}>
          <Switch defaultChecked={val as boolean} />
        </Row>
      ))}
    </Section>

    <Section icon={Lock} title="Security">
      <Row label="Current password"><Input type="password" placeholder="••••••••" className="w-56 bg-white/70" /></Row>
      <Row label="New password"><Input type="password" placeholder="••••••••" className="w-56 bg-white/70" /></Row>
      <Row label="Two-factor authentication"><Switch defaultChecked /></Row>
    </Section>

    <Section icon={Palette} title="Preferences">
      <Row label="Email digest frequency">
        <select className="bg-white/70 border border-border/60 rounded-xl px-3 py-2 text-sm">
          <option>Daily</option><option>Weekly</option><option>Monthly</option>
        </select>
      </Row>
      <Row label="Theme">
        <span className="text-sm text-muted-foreground">Light (default)</span>
      </Row>
    </Section>

    <Section icon={ShieldCheck} title="Privacy">
      <Row label="Make profile visible to recruiters"><Switch defaultChecked /></Row>
      <Row label="Allow AI to analyze interviews"><Switch defaultChecked /></Row>
    </Section>

    <div className="flex justify-end">
      <Button className="bg-gradient-primary glow-shadow">Save changes</Button>
    </div>
  </div>
);

const Section = ({ icon: Icon, title, children }: any) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-primary" />
      <h3 className="font-semibold">{title}</h3>
    </div>
    <div className="divide-y divide-border/60">{children}</div>
  </motion.div>
);

const Row = ({ label, children }: any) => (
  <div className="flex items-center justify-between py-3">
    <Label className="text-sm">{label}</Label>
    {children}
  </div>
);

export default Settings;
