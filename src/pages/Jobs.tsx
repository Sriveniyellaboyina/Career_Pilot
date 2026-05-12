
/* jobs.tsx code */



import React, { useEffect, useState } from "react";

const JOB_API =
  "https://hp3kai71wi.execute-api.us-east-1.amazonaws.com/dev/jobsearch";

const Jobs = () => {

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState("");
  const [role, setRole] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        // =====================================
        // GET SCORE
        // =====================================
        const result = JSON.parse(
          localStorage.getItem("evaluationResult") || "{}"
        );

        const userScore = result.score || 0;

        setScore(userScore);

        // =====================================
        // GET SKILLS
        // =====================================
        const skills = JSON.parse(
          localStorage.getItem("skills") || "[]"
        );

        // =====================================
        // DETECT ROLE
        // =====================================
        const lowerSkills =
          skills.map((s: string) =>
            s.toLowerCase()
          );

        let detectedRole = "Software Developer";

        if (
          lowerSkills.includes("react") ||
          lowerSkills.includes("html") ||
          lowerSkills.includes("css") ||
          lowerSkills.includes("javascript")
        ) {
          detectedRole = "Frontend Developer";
        }

        else if (
          lowerSkills.includes("python")
        ) {
          detectedRole = "Python Developer";
        }

        else if (
          lowerSkills.includes("java")
        ) {
          detectedRole = "Java Developer";
        }

        else if (
          lowerSkills.includes("aws") ||
          lowerSkills.includes("devops")
        ) {
          detectedRole = "DevOps Engineer";
        }

        setRole(detectedRole);

        // =====================================
        // SCORE → LEVEL
        // =====================================
        let userLevel = "Basic";

        if (userScore >= 70) {
          userLevel = "Advanced";
        }

        else if (userScore >= 40) {
          userLevel = "Intermediate";
        }

        setLevel(userLevel);

        // =====================================
        // SEARCH QUERY
        // =====================================
        let query = detectedRole;

        if (userLevel === "Basic") {
          query =
            `${detectedRole} Internship`;
        }

        else if (
          userLevel === "Intermediate"
        ) {
          query =
            `Junior ${detectedRole}`;
        }

        else {
          query =
            `Senior ${detectedRole}`;
        }

        // =====================================
        // FETCH JOBS
        // =====================================
        const response = await fetch(
          JOB_API,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              skill: query
            })
          }
        );

        const data = await response.json();

        let parsedData = data;

        if (data.body) {
          parsedData = JSON.parse(data.body);
        }

        setJobs(parsedData.jobs || []);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }
    };

    fetchJobs();

  }, []);

  // =====================================
  // LOADING
  // =====================================
  if (loading) {

    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "24px"
        }}
      >
        Loading Jobs...
      </div>
    );
  }

  return (

    <div style={{ padding: "30px" }}>

      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        Recommended Jobs
      </h1>

      <div
        style={{
          marginBottom: "25px",
          fontSize: "20px"
        }}
      >

        <p>
          <b>Role:</b>
          {" "}
          {role}
        </p>

        <p>
          <b>Score:</b>
          {" "}
          {score}%
        </p>

        <p>
          <b>Level:</b>
          {" "}
          {level}
        </p>

      </div>

      <div
        style={{
          display: "grid",
          gap: "20px"
        }}
      >

        {jobs.map((job, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "12px",
              background: "#fff"
            }}
          >

            <h2>{job.title}</h2>

            <p>
              <b>Company:</b>
              {" "}
              {job.company}
            </p>

            <p>
              <b>Location:</b>
              {" "}
              {job.location}
            </p>

            <p>
              <b>Type:</b>
              {" "}
              {job.employment_type}
            </p>

            <a
              href={job.apply_link}
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Apply Now
              </button>
            </a>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Jobs;