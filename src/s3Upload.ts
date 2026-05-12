import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";


// ======================================
// ENV VARIABLES
// ======================================
const ACCESS_KEY =
  import.meta.env.VITE_AWS_ACCESS_KEY;

const SECRET_KEY =
  import.meta.env.VITE_AWS_SECRET_KEY;


// ======================================
// DEBUG LOGS
// ======================================
console.log(
  "AWS ACCESS KEY:",
  ACCESS_KEY
);

console.log(
  "AWS SECRET KEY:",
  SECRET_KEY
);


// ======================================
// VALIDATE ENV VARIABLES
// ======================================
if (!ACCESS_KEY || !SECRET_KEY) {

  console.error(
    "AWS Credentials Missing!"
  );
}


// ======================================
// CREATE S3 CLIENT
// ======================================
const s3 = new S3Client({

  region: "us-east-1",

  credentials: {

    accessKeyId:
      ACCESS_KEY || "",

    secretAccessKey:
      SECRET_KEY || "",
  },
});


// ======================================
// UPLOAD FUNCTION
// ======================================
export const uploadToS3 = async (
  file: File
) => {

  try {

    // ======================================
    // FILE VALIDATION
    // ======================================
    if (!file) {

      throw new Error(
        "No file selected"
      );
    }


    // ======================================
    // AWS KEY VALIDATION
    // ======================================
    if (
      !ACCESS_KEY ||
      !SECRET_KEY
    ) {

      throw new Error(
        "AWS credentials are missing in .env file"
      );
    }


    // ======================================
    // CONVERT FILE
    // ======================================
    const arrayBuffer =
      await file.arrayBuffer();


    // ======================================
    // S3 PARAMS
    // ======================================
    const params = {

      Bucket:
        "my-upload-bucket-9784",

      Key:
        `${Date.now()}-${file.name}`,

      Body:
        new Uint8Array(
          arrayBuffer
        ),

      ContentType:
        file.type,
    };


    // ======================================
    // CREATE COMMAND
    // ======================================
    const command =
      new PutObjectCommand(
        params
      );


    // ======================================
    // UPLOAD TO S3
    // ======================================
    const response =
      await s3.send(command);


    // ======================================
    // SUCCESS
    // ======================================
    console.log(
      "S3 Upload Success:",
      response
    );

    return response;

  } catch (error) {

    // ======================================
    // ERROR
    // ======================================
    console.error(
      "S3 Upload Error:",
      error
    );

    throw error;
  }
};
