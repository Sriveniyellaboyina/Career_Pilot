import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1",

  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});

export const uploadToS3 = async (file: File) => {

  try {

    const arrayBuffer = await file.arrayBuffer();

    const params = {
      Bucket: "my-upload-bucket-9784",
      Key: file.name,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);

    const response = await s3.send(command);

    console.log("S3 Upload Success:", response);

    return response;

  } catch (error) {

    console.error("S3 Upload Error:", error);

    throw error;
  }
};
