const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireAuth = (req, res, next) => {
  console.log(req.cookies.jwt)
  const token = req.cookies.jwt;
  if (req.cookies.jwt !== undefined) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.send(400).json("no token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No Token");
    res.status(400).send("No Token");
  }
};

module.exports = { checkUser, requireAuth };
