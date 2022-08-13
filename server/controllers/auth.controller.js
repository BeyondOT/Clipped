const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signInErrors, signUpErrors } = require("../utils/errors.utils");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const setResponseCookie = (req, res, token, strategyName) => {
  const isHttps = req.protocol === "https";
  let {
    cookie: { maxAge },
  } = config;
  const cookieSettings = (isHttps) => ({
    maxAge,
    httpOnly: true,
    secure: isHttps,
  });

  const cookies = new cookies(req, res);
  cookies.set("auth.strategy", strategyName, cookieSettings(isHttps));
  cookies.set("jwt", token, cookieSettings(isHttps));
};

const signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    let hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      pseudo,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ user: user._id });
  } catch (error) {
    console.log(error);
    const errors = signUpErrors(error);
    return res.status(400).json({ errors });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = signInErrors(error);
    return res.status(400).send({ errors });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.redirect("/");
};

// exports
module.exports = { signUp, signIn, logout };
