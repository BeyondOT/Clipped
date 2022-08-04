const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// Get All Users
const getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// Get User Info By his ID
const userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID. unknown : " + req.params.id);
  }

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown: " + err);
  }).select("-password");
};

// Update User Bio
const updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete user

const deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
};

// Follow user
const follow = (req, res) => {};

const unfollow = (req, res) => {};

module.exports = {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser,
  follow,
  unfollow,
};
