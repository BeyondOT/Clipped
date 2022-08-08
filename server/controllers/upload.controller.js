const UserModel = require("../models/user.model");

const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const uploadProfile = async (req, res) => {
  if (req.ValidationError) {
    return res.status(400).send(req.ValidationError);
  }
  try {
    let uploadUpdateResponse = await UserModel.findOneAndUpdate(
      { pseudo: req.body.name },
      { $set: { picture: "./uploads/profil/" + req.file.filename } },
      { new: true }
    ).select("-password");
    if (!uploadUpdateResponse) throw "User Not found !";
    return res.status(200).json(uploadUpdateResponse);
  } catch (err) {
    await unlinkAsync(req.file.path);
    return res.status(500).json({ message: err });
  }
};

module.exports = { uploadProfile };
