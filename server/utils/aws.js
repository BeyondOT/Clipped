const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
require("dotenv").config({ path: "./config/.env" });

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

/**
 * Uploads a file to AWS S3
 * @param {File} file the to be uploaded to AWS S3
 * @param {string} folder the folder name to be uploaded to. 
 */
const uploadToAws = (file, folder) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${folder}/${file.filename}`,
  };
  return s3.upload(uploadParams).promise();
};

/**
 * Deletes an object from AWS S3
 * @param {string} key the key of the object to be deleted
 */
const deleteFromAws = (key) => {
  return s3.deleteObject({Bucket: bucketName, Key: key}).promise();
}

exports.uploadToAws = uploadToAws;
exports.deleteFromAws = deleteFromAws;
