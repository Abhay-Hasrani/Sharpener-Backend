"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const IAM_KEY_ID = process.env.AWS_IAM_KEY_ID;
const IAM_KEY_SECRET = process.env.AWS_IAM_KEY_SECRET;
let s3Bucket = new aws_sdk_1.default.S3({
    accessKeyId: IAM_KEY_ID,
    secretAccessKey: IAM_KEY_SECRET,
});
// Configure multer to use multer-s3 for storage
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Bucket,
        bucket: BUCKET_NAME,
        acl: "public-read",
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});
exports.default = upload;
