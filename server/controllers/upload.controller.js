const UserModel = require("../models/user.model");

const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const { uploadToAws, deleteFromAws } = require("../utils/aws");
const unlinkAsync = promisify(fs.unlink);

//TODO: Make uploadProfile not return password
const uploadProfile = async (req, res) => {
  if (req.ValidationError) {
    return res.status(400).send(req.ValidationError);
  }
  try {
    // Get the user
    let user = await UserModel.findOne({ pseudo: req.body.name });
    if (!user) throw "User Not found !";

    // If the user has already an image in S3 we delete it
    if (user.pictureKey) {
      let awsDeleteResponse = await deleteFromAws(user.pictureKey);
      console.log(awsDeleteResponse);
    }
    // Upload the new image to S3
    const folderName = "avatars";
    let awsUploadResponse = await uploadToAws(req.file, folderName);

    // Give the db the new picture Location and key
    user.picture = awsUploadResponse.Location;
    user.pictureKey = awsUploadResponse.Key;
    user.save();
    
    await unlinkAsync(req.file.path);
    return res.status(200).json(user);
  } catch (err) {
    if (req.file) {
      await unlinkAsync(req.file.path);
      return res.status(500).json({ message: err });
    }
    return res
      .status(500)
      .json({ message: err, error: "No file was recieved." });
  }
};

module.exports = { uploadProfile };
