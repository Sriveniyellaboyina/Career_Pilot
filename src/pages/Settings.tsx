import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  signOut,
  updatePassword
} from "firebase/auth";

import { auth } from "../firebase";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Bell,
  Lock,
  Palette,
  ShieldCheck,
  LogOut
} from "lucide-react";

const Settings = () => {

  const navigate = useNavigate();

  // ======================================
  // STATES
  // ======================================
  const [jobAlerts, setJobAlerts] =
    useState(true);

  const [testReminders, setTestReminders] =
    useState(true);

  const [weeklyEmails, setWeeklyEmails] =
    useState(false);

  const [profileVisible, setProfileVisible] =
    useState(true);

  const [aiAnalysis, setAiAnalysis] =
    useState(true);

  const [theme, setTheme] =
    useState("Light");

  const [frequency, setFrequency] =
    useState("Daily");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  // ======================================
  // LOAD SETTINGS
  // ======================================
  useEffect(() => {

    const savedSettings = JSON.parse(
      localStorage.getItem("settings") || "{}"
    );

    // ======================================
    // LOAD SAVED VALUES
    // ======================================
    if (savedSettings.jobAlerts !== undefined) {
      setJobAlerts(savedSettings.jobAlerts);
    }

    if (savedSettings.testReminders !== undefined) {
      setTestReminders(savedSettings.testReminders);
    }

    if (savedSettings.weeklyEmails !== undefined) {
      setWeeklyEmails(savedSettings.weeklyEmails);
    }

    if (savedSettings.profileVisible !== undefined) {
      setProfileVisible(savedSettings.profileVisible);
    }

    if (savedSettings.aiAnalysis !== undefined) {
      setAiAnalysis(savedSettings.aiAnalysis);
    }

    if (savedSettings.theme) {
      setTheme(savedSettings.theme);
    }

    if (savedSettings.frequency) {
      setFrequency(savedSettings.frequency);
    }

    // ======================================
    // APPLY THEME ON LOAD
    // ======================================
    const root =
      window.document.documentElement;

    root.classList.remove("light");
    root.classList.remove("dark");

    if (
      savedSettings.theme === "Dark"
    ) {

      root.classList.add("dark");

    } else {

      root.classList.add("light");
    }

  }, []);

  // ======================================
  // SAVE SETTINGS
  // ======================================
  const saveSettings = async () => {

    try {

      const settingsData = {

        jobAlerts,
        testReminders,
        weeklyEmails,
        profileVisible,
        aiAnalysis,
        theme,
        frequency
      };

      // ======================================
      // SAVE LOCAL STORAGE
      // ======================================
      localStorage.setItem(
        "settings",
        JSON.stringify(settingsData)
      );

      // ======================================
      // UPDATE PASSWORD
      // ======================================
      if (
        newPassword.trim() !== ""
      ) {

        const user =
          auth.currentUser;

        if (user) {

          await updatePassword(
            user,
            newPassword
          );
        }
      }

      alert(
        "Settings Saved Successfully"
      );

    } catch (error: any) {

      console.log(error);

      alert(
        error.message
      );
    }
  };

  // ======================================
  // LOGOUT
  // ======================================
  const handleLogout = async () => {

    try {

      await signOut(auth);

      localStorage.clear();

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Logout Failed");
    }
  };

  return (

    <div className="
      space-y-6
      max-w-3xl
      mx-auto
      pb-10
    ">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}
      <div>

        <h1 className="
          text-3xl
          font-bold
        ">
          Settings
        </h1>

        <p className="
          text-muted-foreground
          mt-1
        ">
          Manage your preferences and account security.
        </p>

      </div>

      {/* ====================================== */}
      {/* NOTIFICATIONS */}
      {/* ====================================== */}
      <Section
        icon={Bell}
        title="Notifications"
      >

        <Row label="Job match alerts">

          <Switch
            checked={jobAlerts}
            onCheckedChange={setJobAlerts}
          />

        </Row>

        <Row label="Test reminders">

          <Switch
            checked={testReminders}
            onCheckedChange={setTestReminders}
          />

        </Row>

        <Row label="Weekly progress emails">

          <Switch
            checked={weeklyEmails}
            onCheckedChange={setWeeklyEmails}
          />

        </Row>

      </Section>

      {/* ====================================== */}
      {/* SECURITY */}
      {/* ====================================== */}
      <Section
        icon={Lock}
        title="Security"
      >

        <Row label="Current password">

          <Input
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            className="
              w-56
              bg-white/70
              dark:bg-slate-800
              dark:text-white
            "
          />

        </Row>

        <Row label="New password">

          <Input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="
              w-56
              bg-white/70
              dark:bg-slate-800
              dark:text-white
            "
          />

        </Row>

      </Section>

      {/* ====================================== */}
      {/* PREFERENCES */}
      {/* ====================================== */}
      <Section
        icon={Palette}
        title="Preferences"
      >

        <Row label="Email digest frequency">

          <select

            value={frequency}

            onChange={(e) =>
              setFrequency(
                e.target.value
              )
            }

            className="
              bg-white/70
              dark:bg-slate-800
              dark:text-white
              border
              border-border/60
              rounded-xl
              px-3
              py-2
              text-sm
            "
          >

            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>

          </select>

        </Row>

        {/* ====================================== */}
        {/* THEME */}
        {/* ====================================== */}
        <Row label="Theme">

          <select

            value={theme}

            onChange={(e) => {

              const selectedTheme =
                e.target.value;

              setTheme(selectedTheme);

              // ======================================
              // APPLY THEME INSTANTLY
              // ======================================
              const root =
                window.document.documentElement;

              root.classList.remove("light");
              root.classList.remove("dark");

              if (
                selectedTheme === "Dark"
              ) {

                root.classList.add("dark");

              } else {

                root.classList.add("light");
              }

              // ======================================
              // SAVE THEME
              // ======================================
              const savedSettings =
                JSON.parse(
                  localStorage.getItem("settings") || "{}"
                );

              localStorage.setItem(
                "settings",
                JSON.stringify({
                  ...savedSettings,
                  theme: selectedTheme
                })
              );
            }}

            className="
              bg-white/70
              dark:bg-slate-800
              dark:text-white
              border
              border-border/60
              rounded-xl
              px-3
              py-2
              text-sm
            "
          >

            <option>Light</option>
            <option>Dark</option>

          </select>

        </Row>

      </Section>

      {/* ====================================== */}
      {/* PRIVACY */}
      {/* ====================================== */}
      <Section
        icon={ShieldCheck}
        title="Privacy"
      >

        <Row label="Make profile visible to recruiters">

          <Switch
            checked={profileVisible}
            onCheckedChange={setProfileVisible}
          />

        </Row>

        <Row label="Allow AI to analyze interviews">

          <Switch
            checked={aiAnalysis}
            onCheckedChange={setAiAnalysis}
          />

        </Row>

      </Section>

      {/* ====================================== */}
      {/* BUTTONS */}
      {/* ====================================== */}
      <div className="
        flex
        justify-between
        gap-4
      ">

        <Button

          onClick={handleLogout}

          variant="destructive"

          className="
            px-6
          "
        >

          <LogOut className="
            w-4
            h-4
            mr-2
          " />

          Logout

        </Button>

        <Button

          onClick={saveSettings}

          className="
            bg-gradient-primary
            glow-shadow
          "
        >

          Save Changes

        </Button>

      </div>

    </div>
  );
};

// ======================================
// SECTION COMPONENT
// ======================================
const Section = ({
  icon: Icon,
  title,
  children
}: any) => (

  <motion.div

    initial={{
      opacity: 0,
      y: 16
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    className="
      glass-card
      p-6
    "
  >

    <div className="
      flex
      items-center
      gap-2
      mb-4
    ">

      <Icon className="
        w-4
        h-4
        text-primary
      " />

      <h3 className="
        font-semibold
      ">
        {title}
      </h3>

    </div>

    <div className="
      divide-y
      divide-border/60
    ">

      {children}

    </div>

  </motion.div>
);

// ======================================
// ROW COMPONENT
// ======================================
const Row = ({
  label,
  children
}: any) => (

  <div className="
    flex
    items-center
    justify-between
    py-3
  ">

    <Label className="
      text-sm
    ">
      {label}
    </Label>

    {children}

  </div>
);

export default Settings;