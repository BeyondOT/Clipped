const router = require("express").Router();
const postController = require("../controllers/post.controller");
const { postImageUpload } = require("../utils/multer");

router.get("/", postController.readPost);
router.post("/", postImageUpload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

// Comments
router.patch("/add-comment/:id", postController.addComment);
router.patch("/edit-comment/:id", postController.editComment);
router.patch("/delete-comment/:id", postController.deleteComment);

module.exports = router;
