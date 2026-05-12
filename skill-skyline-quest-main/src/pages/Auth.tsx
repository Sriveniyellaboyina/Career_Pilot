import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Mail, Lock, User, Sparkles, ShieldCheck, Briefcase } from "lucide-react";
import authHero from "@/assets/auth-hero.jpg";

const Auth = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-primary/30 -top-32 -left-32 animate-blob-shift" />
      <div className="blob w-[400px] h-[400px] bg-primary-glow/30 bottom-0 right-0 animate-blob-shift" />

      {/* Left brand panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative z-10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-shadow">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">Career Pilot</div>
            <div className="text-[11px] text-muted-foreground tracking-wider uppercase">AI Platform</div>
          </div>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <img
            src={authHero}
            alt="AI career analysis illustration"
            className="w-full max-w-md mx-auto animate-float"
            width={1024}
            height={1280}
          />
          <div className="mt-6 max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="gradient-text">AI-Powered</span> Skill Verification
            </h1>
            <p className="mt-3 text-muted-foreground">
              Upload your resume. Verify your skills with AI. Get matched to roles built for you.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: Sparkles, label: "Smart parsing" },
                { icon: ShieldCheck, label: "Verified skills" },
                { icon: Briefcase, label: "Real jobs" },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-card p-3 flex flex-col items-center gap-1"
                >
                  <f.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="text-xs text-muted-foreground">© 2026 Career Pilot. All rights reserved.</div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel w-full max-w-md p-8"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="font-bold text-lg">Career Pilot</div>
          </div>
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to continue your career journey</p>

          <Tabs value={tab} onValueChange={setTab} className="mt-6">
            <TabsList className="grid grid-cols-2 w-full bg-muted/60">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={submit} className="space-y-4 mt-5">
                <Field icon={Mail} label="Email" type="email" placeholder="you@careerpilot.ai" />
                <Field icon={Lock} label="Password" type="password" placeholder="••••••••" />
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                </div>
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 glow-shadow">
                  Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={submit} className="space-y-4 mt-5">
                <Field icon={User} label="Full name" placeholder="Alex Morgan" />
                <Field icon={Mail} label="Email" type="email" placeholder="you@careerpilot.ai" />
                <Field icon={Lock} label="Password" type="password" placeholder="••••••••" />
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 glow-shadow">
                  Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <Button variant="outline" className="w-full bg-white/60 border-border/60" onClick={() => navigate("/dashboard")}>
            <GoogleIcon /> Continue with Google
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const Field = ({ icon: Icon, label, ...props }: any) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium">{label}</Label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input {...props} className="pl-9 bg-white/70 border-border/60 rounded-xl h-11" />
    </div>
  </div>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.9 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 34.9 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41.1 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
);

export default Auth;
