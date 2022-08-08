const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const { avatarUpload } = require("../utils/multer");
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User mangement and authentication
 */

// Auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user display
/**
 * @swagger
 * /user:
 *   get:
 *     description: Use to request all users
 *     tags: [User]
 *
 */
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload

router.post(
  "/upload",
  avatarUpload.single("image"),
  uploadController.uploadProfile
);
module.exports = router;
