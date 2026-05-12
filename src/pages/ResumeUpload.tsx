/* resumeupload code */

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  Upload,
  FileText,
  CheckCircle2,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { uploadToS3 } from "../s3Upload";

import {
  fetchResumeData
} from "@/lib/dataExtraction";


// ======================================
// AWS API
// ======================================
const EXTRACT_API =
  "https://19w1wzit06.execute-api.us-east-1.amazonaws.com/dev/extract-skills";


const ResumeUpload = () => {

  const navigate =
    useNavigate();

  const [stage, setStage] =
    useState<
      "idle" |
      "uploading" |
      "scanning" |
      "done"
    >("idle");

  const [fileName, setFileName] =
    useState("");

  const [resumeData, setResumeData] =
    useState<any>(null);


  // ======================================
  // HANDLE FILE
  // ======================================
  const handleFile = async (
    file?: File
  ) => {

    if (!file) return;

    setFileName(file.name);

    setStage("uploading");

    try {

      // ======================================
      // UPLOAD TO S3
      // ======================================
      await uploadToS3(file);

      console.log(
        "File Uploaded To S3"
      );

      // ======================================
      // FETCH EDUCATION / EXPERIENCE / PROJECTS
      // ======================================
      const parsed =
        await fetchResumeData(
          "my-upload-bucket-9784",
          file.name
        );

      console.log(
        "Resume Parsed Data:",
        parsed
      );

      // ======================================
      // SAVE FULL DATA
      // ======================================
      localStorage.setItem(
        "resumeData",
        JSON.stringify(parsed)
      );

      setStage("scanning");

      // ======================================
      // CALL AWS SKILLS API
      // ======================================
      const response =
        await fetch(
          EXTRACT_API,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              bucket:
                "my-upload-bucket-9784",

              file:
                file.name,

            }),

          }
        );

      // ======================================
      // RESPONSE
      // ======================================
      const result =
        await response.json();

      const data =
        typeof result.body ===
          "string"
          ? JSON.parse(
              result.body
            )
          : result;

      console.log(
        "Parsed API Response:",
        data
      );

      // ======================================
      // SAVE SKILLS
      // ======================================
      localStorage.setItem(
        "skills",
        JSON.stringify(
          data.skills || []
        )
      );

      // ======================================
      // MERGE DATA
      // ======================================
      const fullResumeData = {

        ...parsed,

        ...data
      };

      // ======================================
      // SAVE MERGED DATA
      // ======================================
      localStorage.setItem(
        "resumeData",
        JSON.stringify(
          fullResumeData
        )
      );

      console.log(
        "Final Resume Data:",
        fullResumeData
      );

      // ======================================
      // SET UI
      // ======================================
      setResumeData(
        fullResumeData
      );

      setStage("done");

    } catch (error) {

      console.error(error);

      alert(
        "Resume extraction failed"
      );

      setStage("idle");
    }
  };


  return (

    <div className="space-y-6">

      {/* ====================================== */}
      {/* TITLE */}
      {/* ====================================== */}
      <div>

        <h1 className="
          text-3xl
          font-bold
        ">

          Resume Upload

        </h1>

        <p className="
          text-muted-foreground
          mt-1
        ">

          Upload your resume and
          extract resume data using AI.

        </p>

      </div>


      {/* ====================================== */}
      {/* UPLOAD AREA */}
      {/* ====================================== */}
      {stage === "idle" && (

        <motion.label

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          htmlFor="resume"

          className="
            glass-panel
            p-12
            flex
            flex-col
            items-center
            justify-center
            text-center
            cursor-pointer
            border-2
            border-dashed
            border-primary/30
            hover:border-primary/60
            transition-colors
          "
        >

          <motion.div

            animate={{
              y: [0, -8, 0]
            }}

            transition={{
              duration: 2,
              repeat: Infinity,
            }}

            className="
              w-20
              h-20
              rounded-2xl
              gradient-primary
              flex
              items-center
              justify-center
              glow-shadow
              mb-4
            "
          >

            <Upload className="
              w-9
              h-9
              text-white
            " />

          </motion.div>


          <h3 className="
            text-xl
            font-semibold
          ">

            Drag & Drop Resume

          </h3>

          <p className="
            text-sm
            text-muted-foreground
            mt-1
          ">

            Upload PDF Resume

          </p>


          <Button

            className="
              mt-5
              bg-gradient-primary
            "

            type="button"

            onClick={(e) => {

              e.preventDefault();

              document
                .getElementById(
                  "resume"
                )
                ?.click();

            }}
          >

            Browse File

          </Button>


          <input

            id="resume"

            type="file"

            accept=".pdf"

            className="hidden"

            onChange={(e) =>
              handleFile(
                e.target.files?.[0]
              )
            }
          />

        </motion.label>
      )}


      {/* ====================================== */}
      {/* LOADING */}
      {/* ====================================== */}
      <AnimatePresence>

        {(stage === "uploading" ||
          stage === "scanning") && (

          <motion.div

            initial={{
              opacity: 0,
              y: 16
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            exit={{
              opacity: 0
            }}

            className="
              glass-card
              p-8
              flex
              items-center
              gap-4
            "
          >

            <div className="
              w-14
              h-14
              rounded-xl
              bg-gradient-primary
              flex
              items-center
              justify-center
            ">

              <FileText className="
                w-6
                h-6
                text-white
              " />

            </div>


            <div className="flex-1">

              <div className="
                font-semibold
              ">

                {fileName}

              </div>

              <div className="
                text-sm
                text-muted-foreground
                flex
                items-center
                gap-2
                mt-1
              ">

                <Loader2 className="
                  w-4
                  h-4
                  animate-spin
                " />

                {
                  stage === "uploading"
                    ? "Uploading Resume..."
                    : "Extracting Resume Data..."
                }

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>


      {/* ====================================== */}
      {/* SUCCESS */}
      {/* ====================================== */}
      {stage === "done" &&
        resumeData && (

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
            space-y-6
          "
        >

          <div className="
            glass-card
            p-6
            flex
            items-center
            gap-3
          ">

            <CheckCircle2 className="
              w-6
              h-6
              text-green-500
            " />

            <div className="flex-1">

              <div className="
                font-semibold
              ">

                Resume Parsed Successfully

              </div>

              <div className="
                text-xs
                text-muted-foreground
              ">

                {fileName}

              </div>

            </div>


            <Button

              onClick={() =>
                navigate("/profile")
              }

              className="
                bg-gradient-primary
              "
            >

              View Profile →

            </Button>

          </div>


          {/* ====================================== */}
          {/* SKILLS */}
          {/* ====================================== */}
          <div className="
            glass-card
            p-6
          ">

            <h3 className="
              text-sm
              font-semibold
              uppercase
              mb-4
            ">

              Extracted Skills

            </h3>

            <div className="
              flex
              flex-wrap
              gap-2
            ">

              {resumeData.skills?.map(
                (
                  skill: string,
                  i: number
                ) => (

                  <span

                    key={i}

                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-primary/10
                      text-primary
                      text-sm
                      font-medium
                    "
                  >

                    {skill}

                  </span>
                )
              )}

            </div>

          </div>

        </motion.div>
      )}

    </div>
  );
};

export default ResumeUpload;