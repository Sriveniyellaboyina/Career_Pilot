import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

const QUESTIONS_API =
  "https://3bpmwewngf.execute-api.us-east-1.amazonaws.com/dev/generate-questions";

const Verification = () => {

  const navigate = useNavigate();

  const [questions, setQuestions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState<any>({});

  const [error, setError] =
    useState("");

  // ======================================================
  // FETCH QUESTIONS
  // ======================================================
  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const skills = JSON.parse(
          localStorage.getItem("skills") || "[]"
        );

        console.log(
          "Resume Skills:",
          skills
        );

        if (skills.length === 0) {

          setError("No skills found");

          setLoading(false);

          return;
        }

        const response = await fetch(
          QUESTIONS_API,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              skills: skills,
            }),
          }
        );

        const result =
          await response.json();

        console.log(
          "Questions API:",
          result
        );

        const data =
          typeof result.body === "string"
            ? JSON.parse(result.body)
            : result;

        console.log(
          "Parsed Data:",
          data
        );

        if (
          !data.questions ||
          data.questions.length === 0
        ) {

          setError(
            "No questions generated"
          );

        } else {

          setQuestions(
            data.questions
          );
        }

      } catch (err) {

        console.log(err);

        setError(
          "Failed to load questions"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchQuestions();

  }, []);

  // ======================================================
  // SELECT ANSWER
  // ======================================================
  const selectAnswer = (
    answer: string
  ) => {

    setAnswers({

      ...answers,

      [currentQuestion]:
        answer,
    });
  };

  // ======================================================
  // NEXT QUESTION
  // ======================================================
  const nextQuestion = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );
    }
  };

  // ======================================================
  // PREVIOUS QUESTION
  // ======================================================
  const prevQuestion = () => {

    if (currentQuestion > 0) {

      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  };

  // ======================================================
  // SUBMIT TEST
  // ======================================================
  const submitTest = () => {

    let correct = 0;

    const skillWise: any = {};

    questions.forEach(
      (q, index) => {

        const userAnswer =
          answers[index];

        // ======================================
        // FIND CORRECT OPTION
        // ======================================
        let correctAnswer = "";

        const letters = [
          "A",
          "B",
          "C",
          "D"
        ];

        if (
          q.options &&
          q.answer
        ) {

          const correctIndex =
            q.options.findIndex(
              (option: string) =>
                option
                  .trim()
                  .toLowerCase() ===
                q.answer
                  .trim()
                  .toLowerCase()
            );

          if (correctIndex !== -1) {

            correctAnswer =
              letters[correctIndex];
          }
        }

        // ======================================
        // CHECK ANSWER
        // ======================================
        const isCorrect =
          userAnswer === correctAnswer;

        if (isCorrect) {

          correct++;
        }

        // ======================================
        // SKILL ANALYTICS
        // ======================================
        if (!skillWise[q.skill]) {

          skillWise[q.skill] = {

            total: 0,

            correct: 0,
          };
        }

        skillWise[q.skill].total += 1;

        if (isCorrect) {

          skillWise[q.skill].correct += 1;
        }
      }
    );

    // ======================================
    // SKILL SCORES
    // ======================================
    const skillScores =
      Object.keys(skillWise).map(
        (skill) => ({

          skill,

          score: Math.round(
            (
              skillWise[skill]
                .correct /
              skillWise[skill]
                .total
            ) * 100
          ),
        })
      );

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

    localStorage.setItem(
      "weakSkills",
      JSON.stringify(weakSkills)
    );

    console.log(
      "Weak Skills:",
      weakSkills
    );

    // ======================================
    // TOTAL QUESTIONS
    // ======================================
    const totalQuestions =
      questions.length;

    // ======================================
    // WRONG ANSWERS
    // ======================================
    const wrong =
      totalQuestions - correct;

    // ======================================
    // FINAL SCORE
    // ======================================
    const score =
      totalQuestions > 0
        ? Math.round(
            (
              correct /
              totalQuestions
            ) * 100
          )
        : 0;

    // ======================================
    // FINAL RESULT
    // ======================================
    const finalResult = {

      score,

      correct_answers:
        correct,

      wrong_answers:
        wrong,

      total_questions:
        totalQuestions,

      skill_scores:
        skillScores,
    };

    console.log(
      "FINAL RESULT:",
      finalResult
    );

    // ======================================
    // SAVE RESULT
    // ======================================
    localStorage.setItem(
      "evaluationResult",
      JSON.stringify(finalResult)
    );

    // ======================================
    // NAVIGATE
    // ======================================
    navigate("/results");
  };

  // ======================================================
  // LOADING
  // ======================================================
  if (loading) {

    return (

      <div
        style={{
          height: "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          fontSize: "30px",

          fontWeight: "bold",
        }}
      >
        Loading Questions...
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================
  if (error) {

    return (

      <div
        style={{
          height: "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          fontSize: "30px",

          fontWeight: "bold",

          color: "red",
        }}
      >
        {error}
      </div>
    );
  }

  const question =
    questions[currentQuestion];

  return (

    <div
      style={{
        maxWidth: "1400px",

        margin: "0 auto",

        padding: "20px",

        display: "flex",

        gap: "20px",
      }}
    >

      {/* LEFT SIDE */}
      <div
        style={{
          width: "220px",

          minWidth: "220px",

          background: "#fff",

          border:
            "1px solid #ddd",

          borderRadius: "12px",

          padding: "15px",

          height: "fit-content",

          position: "sticky",

          top: "20px",
        }}
      >

        <h3
          style={{
            marginBottom: "15px",

            fontSize: "20px",

            fontWeight: "bold",
          }}
        >
          Questions
        </h3>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(5, 1fr)",

            gap: "8px",
          }}
        >

          {questions.map(
            (_: any, index: number) => (

              <button

                key={index}

                onClick={() =>
                  setCurrentQuestion(
                    index
                  )
                }

                style={{
                  width: "35px",

                  height: "35px",

                  borderRadius:
                    "8px",

                  border: "none",

                  background:
                    currentQuestion ===
                    index
                      ? "#2563eb"
                      : answers[index]
                      ? "#16a34a"
                      : "#e5e7eb",

                  color:
                    currentQuestion ===
                      index ||
                    answers[index]
                      ? "white"
                      : "black",

                  fontWeight:
                    "bold",

                  cursor:
                    "pointer",
                }}
              >
                {index + 1}
              </button>
            )
          )}

        </div>

      </div>

      {/* QUESTION AREA */}
      <div style={{ flex: 1 }}>

        <h1
          style={{
            fontSize: "40px",

            marginBottom: "20px",
          }}
        >
          Skill Verification Test
        </h1>

        <div
          style={{
            marginBottom: "15px",

            fontWeight: "bold",

            fontSize: "18px",
          }}
        >
          Question
          {" "}
          {currentQuestion + 1}

          {" / "}

          {questions.length}
        </div>

        <div
          style={{
            display: "inline-block",

            background: "#2563eb",

            color: "white",

            padding:
              "8px 14px",

            borderRadius:
              "8px",

            marginBottom:
              "20px",

            fontWeight:
              "bold",

            textTransform:
              "uppercase",
          }}
        >
          {question.skill}
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",

            borderRadius:
              "12px",

            padding: "30px",

            background: "#fff",

            marginBottom:
              "20px",
          }}
        >

          <h2
            style={{
              fontSize: "28px",

              marginBottom:
                "25px",

              lineHeight: "1.5",
            }}
          >
            {question.question}
          </h2>

          {question.options.map(
            (
              option: string,
              index: number
            ) => {

              const letters =
                [
                  "A",
                  "B",
                  "C",
                  "D",
                ];

              const value =
                letters[index];

              return (

                <button

                  key={index}

                  onClick={() =>
                    selectAnswer(
                      value
                    )
                  }

                  style={{
                    width: "100%",

                    display:
                      "block",

                    padding:
                      "16px",

                    marginBottom:
                      "16px",

                    borderRadius:
                      "10px",

                    border:
                      "1px solid #d1d5db",

                    textAlign:
                      "left",

                    fontSize:
                      "17px",

                    background:
                      answers[
                        currentQuestion
                      ] === value
                        ? "#2563eb"
                        : "#fff",

                    color:
                      answers[
                        currentQuestion
                      ] === value
                        ? "#fff"
                        : "#111827",

                    cursor:
                      "pointer",

                    transition:
                      "0.3s",
                  }}
                >

                  <strong>
                    {value}.
                  </strong>

                  {" "}

                  {option}

                </button>
              );
            }
          )}

        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",
          }}
        >

          <button

            onClick={prevQuestion}

            disabled={
              currentQuestion === 0
            }

            style={{
              padding:
                "12px 24px",

              border: "none",

              borderRadius:
                "8px",

              background:
                "#d1d5db",

              cursor:
                "pointer",

              fontWeight:
                "bold",

              fontSize:
                "16px",
            }}
          >
            Previous
          </button>

          {currentQuestion ===
          questions.length - 1 ? (

            <button

              onClick={submitTest}

              style={{
                padding:
                  "12px 24px",

                border: "none",

                borderRadius:
                  "8px",

                background:
                  "#16a34a",

                color: "white",

                cursor:
                  "pointer",

                fontWeight:
                  "bold",

                fontSize:
                  "16px",
              }}
            >
              Submit Test
            </button>

          ) : (

            <button

              onClick={nextQuestion}

              style={{
                padding:
                  "12px 24px",

                border: "none",

                borderRadius:
                  "8px",

                background:
                  "#2563eb",

                color: "white",

                cursor:
                  "pointer",

                  fontWeight:
                    "bold",

                  fontSize:
                    "16px",
                }}
              >
                Next
              </button>

            )}

        </div>

      </div>

    </div>
  );
};

export default Verification;