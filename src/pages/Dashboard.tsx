import { useEffect, useState } from "react";

import { StatCard } from "@/components/StatCard";

import {
  FileCheck,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Bell,
  Sparkles,
  CalendarClock,
  GraduationCap,
  FolderOpen
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis
} from "recharts";

import {
  testScoreTrend,
  notifications,
  aiSuggestions
} from "@/lib/mockData";

import { motion } from "framer-motion";

const Dashboard = () => {

  // ======================================
  // USER
  // ======================================
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // ======================================
  // STATES
  // ======================================
  const [skillsAnalytics, setSkillsAnalytics] =
    useState<any[]>([]);

  const [resumeScore, setResumeScore] =
    useState(85);

  const [verifiedSkills, setVerifiedSkills] =
    useState(0);

  const [recommendedJobs, setRecommendedJobs] =
    useState(10);

  const [performance, setPerformance] =
    useState(78);

  const [educationCount, setEducationCount] =
    useState(0);

  const [experienceCount, setExperienceCount] =
    useState(0);

  const [projectsCount, setProjectsCount] =
    useState(0);

  const [careerProgress, setCareerProgress] =
    useState<any[]>([]);

  // ======================================
  // LOAD RESUME DATA
  // ======================================
  useEffect(() => {

    const resumeData = JSON.parse(
      localStorage.getItem(
        "resumeData"
      ) || "{}"
    );

    console.log(
      "Dashboard Resume Data:",
      resumeData
    );

    // ======================================
    // SKILLS
    // ======================================
    const skills =
      resumeData.skills ||
      resumeData.extracted_skills ||
      [];

    // ======================================
    // EDUCATION / EXPERIENCE / PROJECTS
    // ======================================
    const education =
      resumeData.education || [];

    const experience =
      resumeData.experience || [];

    const projects =
      resumeData.projects || [];

    setEducationCount(
      education.length
    );

    setExperienceCount(
      experience.length
    );

    setProjectsCount(
      projects.length
    );

    // ======================================
    // VERIFIED SKILLS
    // ======================================
    setVerifiedSkills(
      skills.length
    );

    // ======================================
    // SKILLS ANALYTICS
    // ======================================
    const analytics =
      skills.map(
        (
          skill: string,
          index: number
        ) => ({

          name: skill,

          score:
            70 +
            (
              (
                index * 7
              ) % 30
            )
        })
      );

    setSkillsAnalytics(
      analytics
    );

    // ======================================
    // RESUME SCORE
    // ======================================
    let score = 50;

    score +=
      skills.length * 4;

    score +=
      education.length * 8;

    score +=
      experience.length * 10;

    score +=
      projects.length * 6;

    score =
      Math.min(score, 98);

    setResumeScore(score);

    // ======================================
    // RECOMMENDED JOBS
    // ======================================
    if (skills.length >= 8) {

      setRecommendedJobs(18);

    } else if (
      skills.length >= 5
    ) {

      setRecommendedJobs(12);

    } else {

      setRecommendedJobs(6);
    }

    // ======================================
    // PERFORMANCE
    // ======================================
    const evaluationResult =
      JSON.parse(
        localStorage.getItem(
          "evaluationResult"
        ) || "{}"
      );

    if (
      evaluationResult.score
    ) {

      setPerformance(
        evaluationResult.score
      );
    }

    // ======================================
    // CAREER PROGRESS CHART
    // ======================================
    setCareerProgress([

      {
        stage: "Skills",
        value:
          skills.length * 10
      },

      {
        stage: "Education",
        value:
          education.length * 25
      },

      {
        stage: "Experience",
        value:
          experience.length * 25
      },

      {
        stage: "Projects",
        value:
          projects.length * 20
      },

      {
        stage: "Performance",
        value:
          evaluationResult.score || 60
      }

    ]);

  }, []);

  return (

    <div className="space-y-6">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}
      <div>

        <h1 className="
          text-3xl
          font-bold
        ">

          Welcome back,
          {" "}
          {
            user?.name
              ?.split(" ")[0] ||
            "User"
          }
          👋

        </h1>

        <p className="
          text-muted-foreground
          mt-1
        ">

          Here's the pulse of your career today.

        </p>

      </div>

      {/* ====================================== */}
      {/* STATS */}
      {/* ====================================== */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
      ">

        <StatCard
          icon={FileCheck}
          label="Resume Score"
          value={`${resumeScore}%`}
          trend="AI analyzed"
          delay={0}
        />

        <StatCard
          icon={ShieldCheck}
          label="Verified Skills"
          value={`${verifiedSkills}`}
          trend="Resume extracted"
          delay={0.05}
        />

        <StatCard
          icon={TrendingUp}
          label="Test Performance"
          value={`${performance}%`}
          trend="Interview ready"
          delay={0.1}
        />

        <StatCard
          icon={Briefcase}
          label="Recommended Jobs"
          value={`${recommendedJobs}`}
          trend="AI matched"
          delay={0.15}
        />

      </div>

      {/* ====================================== */}
      {/* EXTRA STATS */}
      {/* ====================================== */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      ">

        <StatCard
          icon={GraduationCap}
          label="Education"
          value={`${educationCount}`}
          trend="Resume detected"
          delay={0.2}
        />

        <StatCard
          icon={Briefcase}
          label="Experience"
          value={`${experienceCount}`}
          trend="Experience sections"
          delay={0.25}
        />

        <StatCard
          icon={FolderOpen}
          label="Projects"
          value={`${projectsCount}`}
          trend="Projects extracted"
          delay={0.3}
        />

      </div>

      {/* ====================================== */}
      {/* CHARTS */}
      {/* ====================================== */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">

        {/* TEST TREND */}
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
            xl:col-span-2
          "
        >

          <h3 className="
            font-semibold
            mb-4
          ">

            Test Score Trend

          </h3>

          <ResponsiveContainer
            width="100%"
            height={240}
          >

            <AreaChart
              data={testScoreTrend}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                dataKey="score"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.25}
              />

            </AreaChart>

          </ResponsiveContainer>

        </motion.div>

        {/* SKILLS */}
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

          <h3 className="
            font-semibold
            mb-4
          ">

            Skills Analytics

          </h3>

          {
            skillsAnalytics.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height={240}
              >

                <RadarChart
                  data={skillsAnalytics}
                >

                  <PolarGrid />

                  <PolarAngleAxis
                    dataKey="name"
                  />

                  <Radar
                    dataKey="score"
                    fill="#6366f1"
                    stroke="#6366f1"
                    fillOpacity={0.3}
                  />

                </RadarChart>

              </ResponsiveContainer>

            ) : (

              <div className="
                h-[240px]
                flex
                items-center
                justify-center
                text-muted-foreground
              ">

                Upload resume to see skills analytics

              </div>

            )
          }

        </motion.div>

      </div>

      {/* ====================================== */}
      {/* CAREER + SIDE PANEL */}
      {/* ====================================== */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">

        {/* CAREER PROGRESS */}
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
            xl:col-span-2
          "
        >

          <h3 className="
            font-semibold
            mb-4
          ">

            Career Progress

          </h3>

          <ResponsiveContainer
            width="100%"
            height={220}
          >

            <BarChart
              data={careerProgress}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="stage" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#22c55e"
              />

            </BarChart>

          </ResponsiveContainer>

        </motion.div>

        {/* RIGHT PANEL */}
        <div className="
          space-y-6
        ">

          {/* NOTIFICATIONS */}
          <div className="
            glass-card
            p-6
          ">

            <div className="
              flex
              items-center
              gap-2
              mb-4
            ">

              <Bell className="
                w-4
                h-4
                text-primary
              " />

              <h3 className="
                font-semibold
                text-sm
              ">

                Notifications

              </h3>

            </div>

            {
              notifications.map(
                (n, i) => (

                  <div
                    key={i}
                    className="mb-3"
                  >

                    <p className="
                      text-sm
                      font-medium
                    ">
                      {n.title}
                    </p>

                    <p className="
                      text-xs
                      text-muted-foreground
                    ">
                      {n.time}
                    </p>

                  </div>

                )
              )
            }

          </div>

          {/* AI SUGGESTIONS */}
          <div className="
            glass-card
            p-6
          ">

            <div className="
              flex
              items-center
              gap-2
              mb-4
            ">

              <Sparkles className="
                w-4
                h-4
                text-primary
              " />

              <h3 className="
                font-semibold
                text-sm
              ">

                AI Suggestions

              </h3>

            </div>

            {
              aiSuggestions.map(
                (s, i) => (

                  <div

                    key={i}

                    className="
                      text-sm
                      bg-muted
                      p-3
                      rounded-xl
                      mb-3
                    "
                  >

                    {s}

                  </div>

                )
              )
            }

          </div>

          {/* UPCOMING TESTS */}
          <div className="
            glass-card
            p-6
          ">

            <div className="
              flex
              items-center
              gap-2
              mb-4
            ">

              <CalendarClock className="
                w-4
                h-4
                text-primary
              " />

              <h3 className="
                font-semibold
                text-sm
              ">

                Upcoming Tests

              </h3>

            </div>

            <div className="
              text-sm
              space-y-3
            ">

              <div className="
                bg-muted
                p-3
                rounded-xl
              ">

                AWS Verification
                <br />

                <span className="
                  text-muted-foreground
                ">
                  Tomorrow · 3PM
                </span>

              </div>

              <div className="
                bg-muted
                p-3
                rounded-xl
              ">

                System Design
                <br />

                <span className="
                  text-muted-foreground
                ">
                  Friday · 11AM
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;