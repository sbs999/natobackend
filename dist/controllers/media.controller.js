"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObject = exports.generatePreSignedUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const generatePreSignedUrl = async (req, res, next) => {
    try {
        const { contentType, objectKey } = req.query;
        const region = process.env.AWS_REGION;
        const uuid = (0, uuid_1.v4)();
        const objectIdentifier = objectKey ? `${objectKey}-${uuid}` : uuid;
        const bucket = process.env.AWS_BUCKET_NAME;
        const client = new client_s3_1.S3Client({ region });
        const putObjectCommand = new client_s3_1.PutObjectCommand({
            Bucket: bucket,
            Key: objectIdentifier,
            ...(contentType ? { ContentType: contentType } : {}),
            ACL: "public-read",
        });
        const preSignedUrl = await (0, s3_request_presigner_1.getSignedUrl)(client, putObjectCommand, {
            expiresIn: 60 * 5, // 5 minute in seconds
        });
        const objectUrl = buildObjectUrl({
            bucketName: bucket,
            region,
            objectIdentifier,
        });
        res.json({ preSignedUrl, objectUrl });
    }
    catch (error) {
        next(error);
    }
};
exports.generatePreSignedUrl = generatePreSignedUrl;
const deleteObject = async (req, res, next) => {
    // To delete an object (from a non-versioned bucket)
    try {
        const { key } = req.params;
        const region = process.env.AWS_REGION;
        const bucket = process.env.AWS_BUCKET_NAME;
        const client = new client_s3_1.S3Client({ region });
        const input = {
            Bucket: bucket,
            Key: key,
        };
        const command = new client_s3_1.DeleteObjectCommand(input);
        await client.send(command);
        res.json({ message: "Successfully Delete Object." });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteObject = deleteObject;
const buildObjectUrl = (credentials) => {
    const { bucketName, region, objectIdentifier } = credentials;
    return `https://${bucketName}.s3.${region}.amazonaws.com/${objectIdentifier}`;
};
