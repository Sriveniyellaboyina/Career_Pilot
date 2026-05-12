import React from "react";
import { useNavigate } from "react-router-dom";

const Results = () => {

  const navigate = useNavigate();

  const result = JSON.parse(
    localStorage.getItem("evaluationResult") || "{}"
  );

  const score = result.score || 0;

  const correct =
    result.correct_answers || 0;

  const wrong =
    result.wrong_answers || 0;

  const total =
    result.total_questions || 0;

  const skillScores =
    result.skill_scores || [];

  // ======================================
  // WEAK SKILLS
  // ======================================
  const weakSkills =
    skillScores
      .filter(
        (item: any) =>
          item.score < 50
      )
      .map(
        (item: any) =>
          item.skill
      );

  // ======================================
  // SAVE WEAK SKILLS
  // ======================================
  localStorage.setItem(
    "weakSkills",
    JSON.stringify(weakSkills)
  );

  console.log(
    "Weak Skills:",
    weakSkills
  );

  return (

    <div
      style={{
        padding: "40px",
        textAlign: "center"
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "30px"
        }}
      >
        Test Results
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px",
          borderRadius: "14px",
          background: "#ffffff",
          boxShadow:
            "0 2px 15px rgba(0,0,0,0.1)"
        }}
      >

        {/* SCORE */}
        <h2
          style={{
            fontSize: "60px",
            color: "#2563eb",
            marginBottom: "10px",
            fontWeight: "bold"
          }}
        >
          {score}%
        </h2>

        <p
          style={{
            fontSize: "20px",
            marginBottom: "40px",
            color: "#6b7280"
          }}
        >
          Overall Performance
        </p>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "20px",
            marginBottom: "50px"
          }}
        >

          {/* TOTAL */}
          <div
            style={{
              padding: "25px",
              background: "#f3f4f6",
              borderRadius: "12px"
            }}
          >

            <h3
              style={{
                marginBottom: "10px"
              }}
            >
              Total Questions
            </h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold"
              }}
            >
              {total}
            </p>

          </div>

          {/* CORRECT */}
          <div
            style={{
              padding: "25px",
              background: "#dcfce7",
              borderRadius: "12px"
            }}
          >

            <h3
              style={{
                marginBottom: "10px"
              }}
            >
              Correct Answers
            </h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "green"
              }}
            >
              {correct}
            </p>

          </div>

          {/* WRONG */}
          <div
            style={{
              padding: "25px",
              background: "#fee2e2",
              borderRadius: "12px"
            }}
          >

            <h3
              style={{
                marginBottom: "10px"
              }}
            >
              Wrong Answers
            </h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "red"
              }}
            >
              {wrong}
            </p>

          </div>

        </div>

        {/* SKILL PERFORMANCE */}
        <div
          style={{
            textAlign: "left",
            marginBottom: "50px"
          }}
        >

          <h2
            style={{
              marginBottom: "25px",
              fontSize: "28px"
            }}
          >
            Skill Performance
          </h2>

          {
            skillScores.map(
              (
                item: any,
                index: number
              ) => (

                <div
                  key={index}
                  style={{
                    marginBottom: "24px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      marginBottom: "8px"
                    }}
                  >

                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform:
                          "capitalize",
                        fontSize: "18px"
                      }}
                    >
                      {item.skill}
                    </span>

                    <span
                      style={{
                        fontWeight: "bold"
                      }}
                    >
                      {item.score}%
                    </span>

                  </div>

                  <div
                    style={{
                      height: "14px",
                      background: "#e5e7eb",
                      borderRadius: "10px",
                      overflow: "hidden"
                    }}
                  >

                    <div
                      style={{
                        width: `${item.score}%`,
                        height: "100%",
                        background:
                          item.score >= 70
                            ? "#16a34a"
                            : item.score >= 40
                            ? "#f59e0b"
                            : "#dc2626"
                      }}
                    />

                  </div>

                </div>
              )
            )
          }

        </div>

        {/* WEAK SKILLS */}
        <div
          style={{
            marginBottom: "50px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              fontSize: "28px"
            }}
          >
            Weak Skills
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center"
            }}
          >

            {
              weakSkills.length > 0 ? (

                weakSkills.map(
                  (
                    skill: string,
                    index: number
                  ) => (

                    <span
                      key={index}
                      style={{
                        padding:
                          "12px 20px",
                        borderRadius:
                          "999px",
                        background:
                          "#fee2e2",
                        color: "#dc2626",
                        fontWeight:
                          "bold",
                        fontSize: "15px"
                      }}
                    >
                      {skill}
                    </span>

                  )
                )

              ) : (

                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  No weak skills 🎉
                </p>

              )
            }

          </div>

        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent:
              "center",
            flexWrap: "wrap"
          }}
        >

          {/* JOBS */}
          <button
            onClick={() =>
              navigate("/jobs")
            }
            style={{
              padding: "14px 28px",
              fontSize: "18px",
              border: "none",
              borderRadius: "8px",
              background: "#7c3aed",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            View Jobs
          </button>

          {/* TUTORIALS */}
          <button
            onClick={() =>
              navigate("/courses")
            }
            style={{
              padding: "14px 28px",
              fontSize: "18px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            View Tutorials
          </button>

          {/* DASHBOARD */}
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            style={{
              padding: "14px 28px",
              fontSize: "18px",
              border: "none",
              borderRadius: "8px",
              background: "#16a34a",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Go Dashboard
          </button>

        </div>

      </div>

    </div>
  );
};

export default Results;