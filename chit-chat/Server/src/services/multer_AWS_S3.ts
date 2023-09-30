import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const IAM_KEY_ID = process.env.AWS_IAM_KEY_ID;
const IAM_KEY_SECRET = process.env.AWS_IAM_KEY_SECRET;

let s3Bucket = new AWS.S3({
  accessKeyId: IAM_KEY_ID,
  secretAccessKey: IAM_KEY_SECRET,
});

// Configure multer to use multer-s3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3Bucket as any,
    bucket: BUCKET_NAME as string,
    acl: "public-read", // Set the ACL for the uploaded file
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

export default upload;
