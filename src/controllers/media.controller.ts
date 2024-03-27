import { RequestHandler } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { GeneratePreSignedUrlCredentials } from "../interfaces/media";

export const generatePreSignedUrl: RequestHandler = async (req, res, next) => {
  try {
    const { contentType, objectKey }: GeneratePreSignedUrlCredentials =
      req.query;

    const client = new S3Client({ region: process.env.AWS_REGION });
    const uuid = uuidv4();

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey ? `${objectKey}-${uuid}` : uuid,
      ...(contentType ? { ContentType: contentType } : {}),
      ACL: "public-read",
    });

    const preSignedUrl = await getSignedUrl(client, putObjectCommand, {
      expiresIn: 60 * 5, // 5 minute in seconds
    });

    res.json({ preSignedUrl });
  } catch (error) {
    next(error);
  }
};
