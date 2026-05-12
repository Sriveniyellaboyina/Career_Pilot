import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line
} from "recharts";

const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#06b6d4",
  "#16a34a",
  "#f59e0b",
  "#ef4444"
];

const Analytics = () => {

  const [skills, setSkills] = useState<string[]>([]);
  const [result, setResult] = useState<any>({});

  useEffect(() => {

    // ============================
    // GET SKILLS
    // ============================
    const savedSkills = JSON.parse(
      localStorage.getItem("skills") || "[]"
    );

    setSkills(savedSkills);

    // ============================
    // GET RESULT
    // ============================
    const savedResult = JSON.parse(
      localStorage.getItem("evaluationResult") || "{}"
    );

    setResult(savedResult);

  }, []);

  // ============================
  // SCORE DATA
  // ============================
  const score = result.score || 0;
  const correct = result.correct_answers || 0;
  const wrong = result.wrong_answers || 0;
  const total = result.total_questions || 0;

  // ============================
  // PIE DATA
  // ============================
  const pieData = [
    {
      name: "Correct",
      value: correct
    },
    {
      name: "Wrong",
      value: wrong
    }
  ];

  // ============================
  // BAR DATA
  // ============================
  const barData = [
    {
      name: "Score",
      value: score
    },
    {
      name: "Correct",
      value: correct
    },
    {
      name: "Wrong",
      value: wrong
    },
    {
      name: "Total",
      value: total
    }
  ];

  // ============================
  // SKILL CATEGORY ANALYTICS
  // ============================
  const getCategory = (skill: string) => {

    const lower = skill.toLowerCase();

    if (
      lower.includes("aws") ||
      lower.includes("azure") ||
      lower.includes("docker") ||
      lower.includes("kubernetes") ||
      lower.includes("devops")
    ) {
      return "Cloud";
    }

    if (
      lower.includes("python") ||
      lower.includes("sql") ||
      lower.includes("machine learning") ||
      lower.includes("data")
    ) {
      return "Data";
    }

    if (
      lower.includes("communication") ||
      lower.includes("leadership") ||
      lower.includes("team")
    ) {
      return "Soft";
    }

    return "Technical";
  };

  // ============================
  // CATEGORY COUNT
  // ============================
  const categoryMap: any = {};

  skills.forEach((skill) => {

    const category = getCategory(skill);

    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }

    categoryMap[category]++;

  });

  const categoryData = Object.keys(categoryMap).map(
    (key) => ({
      name: key,
      value: categoryMap[key]
    })
  );

  // ============================
  // PERFORMANCE TREND
  // ============================
  const performanceData = [
    {
      stage: "Start",
      value: 20
    },
    {
      stage: "Skill Extraction",
      value: 40
    },
    {
      stage: "Verification",
      value: 60
    },
    {
      stage: "Assessment",
      value: score
    }
  ];

  return (

    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      {/* ============================ */}
      {/* HEADER */}
      {/* ============================ */}
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          marginBottom: "10px"
        }}
      >
        Analytics Dashboard
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#666",
          marginBottom: "40px"
        }}
      >
        Skill & Assessment Performance Analytics
      </p>

      {/* ============================ */}
      {/* TOP CARDS */}
      {/* ============================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Skills</h3>
          <h1>{skills.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Assessment Score</h3>
          <h1>{score}%</h1>
        </div>

        <div style={cardStyle}>
          <h3>Correct Answers</h3>
          <h1>{correct}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Wrong Answers</h3>
          <h1>{wrong}</h1>
        </div>

      </div>

      {/* ============================ */}
      {/* CHARTS */}
      {/* ============================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "30px"
        }}
      >

        {/* ============================ */}
        {/* BAR CHART */}
        {/* ============================ */}
        <div style={chartCard}>

          <h2 style={chartTitle}>
            Performance Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* ============================ */}
        {/* PIE CHART */}
        {/* ============================ */}
        <div style={chartCard}>

          <h2 style={chartTitle}>
            Correct vs Wrong Answers
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >

                {pieData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* ============================ */}
        {/* SKILL CATEGORY CHART */}
        {/* ============================ */}
        <div style={chartCard}>

          <h2 style={chartTitle}>
            Skills Category Analysis
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={categoryData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#7c3aed"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* ============================ */}
        {/* LINE CHART */}
        {/* ============================ */}
        <div style={chartCard}>

          <h2 style={chartTitle}>
            Learning Progress
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={performanceData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="stage" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ============================ */}
      {/* SKILLS LIST */}
      {/* ============================ */}
      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Extracted Skills
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >

          {skills.map((skill, index) => (

            <span
              key={index}
              style={{
                background: "#2563eb",
                color: "white",
                padding: "10px 18px",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

    </div>
  );
};

// ============================
// STYLES
// ============================
const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const chartCard: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
};

const chartTitle: React.CSSProperties = {
  marginBottom: "20px",
  fontSize: "22px",
  fontWeight: "bold"
};

export default Analytics;