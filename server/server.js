const express = require("express");
const swaggerDoc = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./helper/documentation");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/database");

const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const swaggerJSDoc = require("swagger-jsdoc");

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
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerDoc.serve, swaggerDoc.setup(swaggerDocs));

//Listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
