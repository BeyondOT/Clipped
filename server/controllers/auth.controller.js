const UserModel = require("../models/user.model");

const signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports = { signUp };
