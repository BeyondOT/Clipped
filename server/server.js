const express = require("express");
const swaggerDoc = require("swagger-ui-express");
const swaggerOptions = require("./documentation/documentation");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/database");
const puppeteer = require("puppeteer");

// TODO: Implement auto video extraction
/* const start = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://outplayed.tv/media/mP4koe");
  const videoLink = await page.evaluate(() => {
    return document.querySelector("video").src;
  });
  console.log(videoLink);
};
start(); */

const { checkUser, requireAuth } = require("./middlewares/auth.middleware");

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_IP],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

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
app.use("/user", userRoutes);
app.use("/post", postRoutes);

// Doc Routes

app.use("/api-docs", swaggerDoc.serve, swaggerDoc.setup(swaggerOptions));

//Listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
