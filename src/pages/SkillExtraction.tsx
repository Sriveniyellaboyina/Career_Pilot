import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  BrainCircuit,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";

// ======================================
// CATEGORY COLORS
// ======================================
const categoryColors: Record<string, string> = {

  Technical:
    "from-blue-500 to-indigo-500",

  Cloud:
    "from-cyan-500 to-blue-500",

  Data:
    "from-violet-500 to-purple-500",

  Soft:
    "from-pink-500 to-rose-500",
};

// ======================================
// CATEGORY DETECTION
// ======================================
const getCategory = (
  skill: string
) => {

  const lower =
    skill.toLowerCase();

  // CLOUD
  if (
    lower.includes("aws") ||
    lower.includes("azure") ||
    lower.includes("cloud") ||
    lower.includes("docker") ||
    lower.includes("kubernetes") ||
    lower.includes("devops")
  ) {

    return "Cloud";
  }

  // DATA
  if (
    lower.includes("python") ||
    lower.includes("sql") ||
    lower.includes("machine learning") ||
    lower.includes("data")
  ) {

    return "Data";
  }

  // SOFT
  if (
    lower.includes("communication") ||
    lower.includes("leadership") ||
    lower.includes("team")
  ) {

    return "Soft";
  }

  // DEFAULT
  return "Technical";
};

// ======================================
// COMPONENT
// ======================================
const SkillExtraction = () => {

  const navigate =
    useNavigate();

  // ======================================
  // GET SKILLS
  // ======================================
  const savedSkills = JSON.parse(
    localStorage.getItem(
      "skills"
    ) || "[]"
  );

  // ======================================
  // FORMAT SKILLS
  // ======================================
  const extractedSkills =
    savedSkills.map(
      (
        skill: string,
        index: number
      ) => ({

        id: index + 1,

        name: skill,

        category:
          getCategory(skill),
      })
    );

  // ======================================
  // UNIQUE CATEGORIES
  // ======================================
  const categories =
    Array.from(

      new Set(

        extractedSkills.map(
          (
            skill: any
          ) =>
            skill.category
        )
      )
    );

  // ======================================
  // EMPTY STATE
  // ======================================
  if (
    extractedSkills.length === 0
  ) {

    return (

      <div className="
        min-h-[70vh]
        flex
        items-center
        justify-center
      ">

        <div className="
          glass-card
          p-10
          text-center
          max-w-lg
        ">

          <BrainCircuit className="
            w-16
            h-16
            mx-auto
            text-primary
            mb-4
          " />

          <h2 className="
            text-2xl
            font-bold
            mb-2
          ">
            No Skills Extracted
          </h2>

          <p className="
            text-muted-foreground
            mb-6
          ">
            Upload your resume first
            to extract skills.
          </p>

          <Button

            onClick={() =>
              navigate("/resume")
            }

            className="
              bg-gradient-primary
              glow-shadow
            "
          >

            Upload Resume

          </Button>

        </div>

      </div>
    );
  }

  // ======================================
  // MAIN UI
  // ======================================
  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="
        flex
        items-end
        justify-between
        flex-wrap
        gap-4
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
          ">
            Extracted Skills
          </h1>

          <p className="
            text-muted-foreground
            mt-1
          ">

            {
              extractedSkills.length
            }
            {" "}
            skills detected

          </p>

        </div>

        <Button

          onClick={() =>
            navigate("/verification")
          }

          className="
            bg-gradient-primary
            glow-shadow
          "
        >

          Start Verification Test

          <ArrowRight className="
            w-4
            h-4
            ml-1
          " />

        </Button>

      </div>

      {/* CATEGORY SECTIONS */}
      {
        categories.map(
          (
            category,
            ci
          ) => (

            <motion.section

              key={category}

              initial={{
                opacity: 0,
                y: 16,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay:
                  ci * 0.08,
              }}
            >

              <h2 className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
                mb-3
              ">

                {category}
                {" "}
                Skills

              </h2>

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4
              ">

                {
                  extractedSkills

                    .filter(
                      (
                        skill: any
                      ) =>
                        skill.category ===
                        category
                    )

                    .map(
                      (
                        skill: any,
                        i: number
                      ) => (

                        <motion.div

                          key={skill.id}

                          initial={{
                            opacity: 0,
                            scale: 0.95,
                          }}

                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}

                          transition={{
                            delay:
                              ci * 0.08 +
                              i * 0.05,
                          }}

                          whileHover={{
                            y: -4,
                          }}

                          className="
                            glass-card
                            p-5
                            relative
                            overflow-hidden
                          "
                        >

                          {/* BG */}
                          <div className={`
                            absolute
                            -right-4
                            -top-4
                            w-20
                            h-20
                            rounded-full
                            bg-gradient-to-br
                            ${
                              categoryColors[
                                skill.category
                              ]
                            }
                            opacity-20
                          `} />

                          {/* SKILL */}
                          <div className="
                            relative
                            z-10
                          ">

                            <h3 className="
                              text-xl
                              font-semibold
                              capitalize
                            ">

                              {skill.name}

                            </h3>

                            <p className="
                              mt-3
                              text-sm
                              text-muted-foreground
                            ">

                              Skill extracted
                              from your resume

                            </p>

                          </div>

                        </motion.div>
                      )
                    )
                }

              </div>

            </motion.section>
          )
        )
      }

    </div>
  );
};

export default SkillExtraction;