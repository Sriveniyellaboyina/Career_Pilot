const DATA_API =
  "https://jfet9uyiwh.execute-api.us-east-1.amazonaws.com/dev/data";

// ======================================
// FETCH RESUME DATA FROM API
// ======================================
export const fetchResumeData =
  async (
    bucket: string,
    file: string
  ) => {

    try {

      const response =
        await fetch(
          DATA_API,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              bucket: bucket,

              file: file

            })
          }
        );

      const result =
        await response.json();

      const parsed =
        typeof result.body ===
          "string"
          ? JSON.parse(
              result.body
            )
          : result;

      // ======================================
      // SAVE TO LOCAL STORAGE
      // ======================================
      localStorage.setItem(
        "resumeData",
        JSON.stringify(parsed)
      );

      console.log(
        "Resume Data:",
        parsed
      );

      return parsed;

    } catch (error) {

      console.error(
        "Resume API Error:",
        error
      );

      return {};
    }
  };

// ======================================
// GET RESUME DATA
// ======================================
export const getResumeData =
  () => {

    return JSON.parse(
      localStorage.getItem(
        "resumeData"
      ) || "{}"
    );
  };

// ======================================
// SKILLS
// ======================================
export const getSkills =
  () => {

    const data =
      getResumeData();

    return (
      data.skills ||
      data.extracted_skills ||
      []
    );
  };

// ======================================
// EDUCATION
// ======================================
export const getEducation =
  () => {

    const data =
      getResumeData();

    return (
      data.education || []
    );
  };

// ======================================
// EXPERIENCE
// ======================================
export const getExperience =
  () => {

    const data =
      getResumeData();

    return (
      data.experience || []
    );
  };

// ======================================
// PROJECTS
// ======================================
export const getProjects =
  () => {

    const data =
      getResumeData();

    return (
      data.projects || []
    );
  };

// ======================================
// CERTIFICATIONS
// ======================================
export const getCertifications =
  () => {

    const data =
      getResumeData();

    return (
      data.certifications || []
    );
  };

// ======================================
// ROLE
// ======================================
export const getRole =
  () => {

    const data =
      getResumeData();

    return (
      data.role ||
      "Full Stack Developer"
    );
  };