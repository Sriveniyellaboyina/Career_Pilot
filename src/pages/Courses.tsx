import React, {
  useEffect,
  useState
} from "react";

const Courses = () => {

  const [courses, setCourses] =
    useState<any[]>([]);

  // ======================================
  // LOAD WEAK SKILLS
  // ======================================
  useEffect(() => {

    const weakSkills = JSON.parse(
      localStorage.getItem(
        "weakSkills"
      ) || "[]"
    );

    const generatedCourses: any[] = [];

    weakSkills.forEach(
      (skill: string) => {

        generatedCourses.push(

          {
            skill,
            title:
              `${skill} Full Course`,
            platform:
              "YouTube",
            url:
              `https://www.youtube.com/results?search_query=${skill}+full+course`
          },

          {
            skill,
            title:
              `${skill} Interview Questions`,
            platform:
              "GeeksforGeeks",
            url:
              `https://www.google.com/search?q=${skill}+interview+questions`
          },

          {
            skill,
            title:
              `${skill} Certification`,
            platform:
              "Coursera",
            url:
              `https://www.coursera.org/search?query=${skill}`
          }

        );
      }
    );

    setCourses(
      generatedCourses
    );

  }, []);

  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px"
        }}
      >
        Recommended Tutorials
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "40px"
        }}
      >
        Tutorials generated based on your weak skills
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px"
        }}
      >

        {
          courses.map(
            (
              course,
              index
            ) => (

              <div
                key={index}
                style={{
                  padding: "25px",
                  borderRadius:
                    "14px",
                  background:
                    "#ffffff",
                  boxShadow:
                    "0 2px 15px rgba(0,0,0,0.1)"
                }}
              >

                <div
                  style={{
                    marginBottom:
                      "15px"
                  }}
                >

                  <span
                    style={{
                      background:
                        "#dbeafe",
                      color:
                        "#2563eb",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "999px",
                      fontSize:
                        "14px",
                      fontWeight:
                        "bold",
                      textTransform:
                        "capitalize"
                    }}
                  >
                    {course.skill}
                  </span>

                </div>

                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom:
                      "10px"
                  }}
                >
                  {course.title}
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    marginBottom:
                      "20px"
                  }}
                >
                  Platform:
                  {" "}
                  <b>
                    {course.platform}
                  </b>
                </p>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display:
                      "inline-block",
                    padding:
                      "12px 20px",
                    borderRadius:
                      "8px",
                    background:
                      "#2563eb",
                    color: "white",
                    textDecoration:
                      "none",
                    fontWeight:
                      "bold"
                  }}
                >
                  Open Tutorial
                </a>

              </div>

            )
          )
        }

      </div>

    </div>
  );
};

export default Courses;