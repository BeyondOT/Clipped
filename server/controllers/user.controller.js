const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// Get All Users
const getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// Get User Info By his ID
const getUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID. unknown : " + req.params.id);
  }

  UserModel.findById(req.params.id)
    .then((user) => {
      if (user == null) {
        res.status(400).send("This user doesn't exist.");
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

// Update User Bio
const updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const filter = { _id: req.params.id };
  const update = { bio: req.body.bio };
  const options = {
    new: true,
    setDefaultsOnInsert: true,
  };
  try {
    let updateResponse = await UserModel.findOneAndUpdate(
      filter,
      update,
      options
    ).select("-password");
    res.status(200).json(updateResponse);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: " Successfully deleted." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Follow user
const follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  if (req.params.id === req.body.idToFollow)
    return res.status(400).send("You can't follow yourself.");

  try {
    // Add to the follower list
    let followResponse = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true }
    ).select("-password");

    // Add to the follower list
    let followedResponse = await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true }
    ).select("-password");

    res.status(200).json({ followResponse, followedResponse });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Unfollow user
const unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  if (req.params.id === req.body.idToUnfollow)
    return res.status(400).send("You can't unfollow yourself.");
  try {
    // remove from the follower list
    let unfollowResponse = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true }
    ).select("-password");

    // Add to the follower list
    let unfollowedResponse = await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true }
    ).select("-password");

    // Send the response
    res.status(200).json({ unfollowResponse, unfollowedResponse });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Exports
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
};
