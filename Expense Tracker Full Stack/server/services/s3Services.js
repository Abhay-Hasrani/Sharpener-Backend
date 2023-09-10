const AWS = require("aws-sdk");

exports.uploadToS3 = (data, filename) => {
  const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  const IAM_KEY_ID = process.env.AWS_IAM_KEY_ID;
  const IAM_KEY_SECRET = process.env.AWS_IAM_KEY_SECRET;

  let s3Bucket = new AWS.S3({
    accessKeyId: IAM_KEY_ID,
    secretAccessKey: IAM_KEY_SECRET,
  });

  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL:"public-read"
  };

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, s3Response) => {
      if (err) {
        reject(err);
      } else {
        resolve(s3Response);
      }
    });
  });
};
