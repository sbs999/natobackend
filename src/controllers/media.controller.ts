import { RequestHandler } from "express";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import {
  IBuildObjectUrlCredentials,
  IGeneratePreSignedUrlCredentials,
} from "../interfaces/media";

export const generatePreSignedUrl: RequestHandler = async (req, res, next) => {
  try {
    const { contentType, objectKey }: IGeneratePreSignedUrlCredentials =
      req.query;

    const region = process.env.AWS_REGION as string;
    const uuid = uuidv4();
    const objectIdentifier = objectKey ? `${objectKey}-${uuid}` : uuid;
    const bucket = process.env.AWS_BUCKET_NAME as string;

    const client = new S3Client({ region });
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: objectIdentifier,
      ...(contentType ? { ContentType: contentType } : {}),
      ACL: "public-read",
    });

    const preSignedUrl = await getSignedUrl(client, putObjectCommand, {
      expiresIn: 60 * 5, // 5 minute in seconds
    });

    const objectUrl = buildObjectUrl({
      bucketName: bucket,
      region,
      objectIdentifier,
    });

    res.json({ preSignedUrl, objectUrl });
  } catch (error) {
    next(error);
  }
};

export const deleteObject: RequestHandler = async (req, res, next) => {
  // To delete an object (from a non-versioned bucket)
  try {
    const { key } = req.params;

    const region = process.env.AWS_REGION as string;
    const bucket = process.env.AWS_BUCKET_NAME as string;
    const client = new S3Client({ region });

    const input = {
      Bucket: bucket,
      Key: key,
    };
    const command = new DeleteObjectCommand(input);
    await client.send(command);

    res.json({ message: "Successfully Delete Object." });
  } catch (error) {
    next(error);
  }
};

const buildObjectUrl = (credentials: IBuildObjectUrlCredentials) => {
  const { bucketName, region, objectIdentifier } = credentials;
  return `https://${bucketName}.s3.${region}.amazonaws.com/${objectIdentifier}`;
};
