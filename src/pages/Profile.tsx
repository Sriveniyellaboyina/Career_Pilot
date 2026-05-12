import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Mail,
  ShieldCheck,
  GraduationCap,
  FolderOpen,
  Briefcase,
  Pencil
} from "lucide-react";

import { auth } from "../firebase";

// ======================================
// IMPORT DATA EXTRACTION
// ======================================
import {
  getResumeData,
  getEducation,
  getExperience,
  getProjects,
  getSkills
} from "@/lib/dataExtraction";

const Profile = () => {

  // ======================================
  // NAVIGATION
  // ======================================
  const navigate = useNavigate();

  // ======================================
  // STATES
  // ======================================
  const [userData, setUserData] =
    useState<any>(null);

  const [resumeData, setResumeData] =
    useState<any>({});

  const [skills, setSkills] =
    useState<string[]>([]);

  const [education, setEducation] =
    useState<any[]>([]);

  const [experience, setExperience] =
    useState<any[]>([]);

  const [projects, setProjects] =
    useState<any[]>([]);

  // ======================================
  // LOAD DATA
  // ======================================
  useEffect(() => {

    // ======================================
    // FIREBASE USER
    // ======================================
    const user = auth.currentUser;

    if (user) {

      setUserData({

        name:
          user.displayName ||
          "Career Pilot User",

        email:
          user.email ||
          "No Email",

        avatar:
          user.email
            ?.charAt(0)
            .toUpperCase() || "U"
      });
    }

    // ======================================
    // RESUME DATA
    // ======================================
    const data =
      getResumeData();

    setResumeData(data);

    // ======================================
    // LOAD ALL DATA
    // ======================================
    setSkills(
      getSkills()
    );

    setEducation(
      getEducation()
    );

    setExperience(
      getExperience()
    );

    setProjects(
      getProjects()
    );

    console.log(
      "Resume Data:",
      data
    );

  }, []);

  return (

    <div className="
      max-w-7xl
      mx-auto
      p-6
      space-y-6
    ">

      {/* ====================================== */}
      {/* PROFILE HEADER */}
      {/* ====================================== */}
      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="
          glass-panel
          p-8
          rounded-[35px]
          flex
          flex-col
          lg:flex-row
          justify-between
          gap-8
        "
      >

        {/* LEFT */}
        <div className="
          flex
          gap-6
          items-start
        ">

          <Avatar className="
            w-28
            h-28
            shadow-xl
          ">

            <AvatarFallback className="
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              text-4xl
              font-bold
            ">

              {userData?.avatar}

            </AvatarFallback>

          </Avatar>

          <div>

            <h1 className="
              text-4xl
              font-bold
            ">

              {userData?.name}

            </h1>

            <p className="
              text-lg
              text-muted-foreground
              mt-1
            ">

              {
                resumeData?.role ||
                "Full Stack Developer"
              }

            </p>

            <div className="
              flex
              items-center
              gap-2
              mt-2
              text-muted-foreground
            ">

              <Mail className="
                w-4
                h-4
              " />

              {userData?.email}

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <Button

          onClick={() =>
            navigate("/edit-profile")
          }

          className="
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            text-white
            rounded-2xl
            h-14
            px-6
            shadow-lg
          "
        >

          <Pencil className="
            w-4
            h-4
            mr-2
          " />

          Edit profile

        </Button>

      </motion.div>

      {/* ====================================== */}
      {/* MAIN GRID */}
      {/* ====================================== */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">

        {/* VERIFIED SKILLS */}
        <Card
          icon={ShieldCheck}
          title="Verified Skills"
        >

          <div className="
            flex
            flex-wrap
            gap-3
          ">

            {
              skills.length > 0 ? (

                skills.map(
                  (
                    skill,
                    index
                  ) => (

                    <span

                      key={index}

                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-purple-600
                        text-white
                        text-sm
                        font-semibold
                      "
                    >

                      ✓ {skill}

                    </span>

                  )
                )

              ) : (

                <p className="
                  text-muted-foreground
                ">

                  No skills extracted

                </p>

              )
            }

          </div>

        </Card>

        {/* EDUCATION */}
        <Card
          icon={GraduationCap}
          title="Education"
        >

          <div className="space-y-6">

            {
              education.length > 0 ? (

                education.map(
                  (
                    edu: any,
                    index: number
                  ) => (

                    <div key={index}>

                      <h3 className="
                        text-xl
                        font-semibold
                      ">

                        {
                          typeof edu ===
                          "string"
                            ? edu
                            : edu.degree
                        }

                      </h3>

                      {
                        typeof edu !==
                        "string" && (

                          <p className="
                            text-muted-foreground
                            mt-1
                          ">

                            {edu.institution}
                            {" · "}
                            {edu.year}

                          </p>

                        )
                      }

                    </div>

                  )
                )

              ) : (

                <p className="
                  text-muted-foreground
                ">

                  No Education Found

                </p>

              )
            }

          </div>

        </Card>

        {/* EXPERIENCE */}
        <Card
          icon={Briefcase}
          title="Experience"
        >

          <div className="space-y-6">

            {
              experience.length > 0 ? (

                experience.map(
                  (
                    exp: any,
                    index: number
                  ) => (

                    <div key={index}>

                      <h3 className="
                        text-xl
                        font-semibold
                      ">

                        {
                          typeof exp ===
                          "string"
                            ? exp
                            : exp.role
                        }

                      </h3>

                      {
                        typeof exp !==
                        "string" && (

                          <p className="
                            text-muted-foreground
                            mt-1
                          ">

                            {exp.company}
                            {" · "}
                            {exp.duration}

                          </p>

                        )
                      }

                    </div>

                  )
                )

              ) : (

                <p className="
                  text-muted-foreground
                ">

                  No Experience Found

                </p>

              )
            }

          </div>

        </Card>

        {/* PROJECTS */}
        <Card
          icon={FolderOpen}
          title="Projects"
        >

          <div className="space-y-6">

            {
              projects.length > 0 ? (

                projects.map(
                  (
                    project: any,
                    index: number
                  ) => (

                    <ProjectItem

                      key={index}

                      title={
                        typeof project ===
                        "string"
                          ? project
                          : project.name
                      }

                      desc={
                        typeof project ===
                        "string"
                          ? "Resume Extracted Project"
                          : project.description
                      }

                      tech={
                        typeof project ===
                        "string"
                          ? "Project"
                          : project.tech
                      }
                    />

                  )
                )

              ) : (

                <p className="
                  text-muted-foreground
                ">

                  No Projects Found

                </p>

              )
            }

          </div>

        </Card>

      </div>

    </div>
  );
};

// ======================================
// CARD COMPONENT
// ======================================
const Card = ({
  icon: Icon,
  title,
  children
}: any) => (

  <motion.div

    initial={{
      opacity: 0,
      y: 20
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    className="
      glass-card
      p-8
      rounded-[30px]
      min-h-[280px]
    "
  >

    <div className="
      flex
      items-center
      gap-3
      mb-6
    ">

      <Icon className="
        w-5
        h-5
        text-primary
      " />

      <h2 className="
        text-2xl
        font-bold
      ">

        {title}

      </h2>

    </div>

    {children}

  </motion.div>
);

// ======================================
// PROJECT ITEM
// ======================================
const ProjectItem = ({
  title,
  desc,
  tech
}: any) => (

  <div className="
    flex
    items-center
    justify-between
    gap-4
  ">

    <div>

      <h3 className="
        text-xl
        font-semibold
      ">

        {title}

      </h3>

      <p className="
        text-muted-foreground
        mt-1
      ">

        {desc}

      </p>

    </div>

    <span className="
      px-3
      py-1
      rounded-full
      bg-purple-100
      dark:bg-purple-500/20
      text-purple-700
      dark:text-purple-300
      text-sm
      font-medium
    ">

      {tech}

    </span>

  </div>
);

export default Profile;