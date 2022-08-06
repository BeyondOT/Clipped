const express = require("express");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/database");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// JWT
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
// Routes
app.use("/api/user", userRoutes);

//Listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
