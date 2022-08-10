const multer = require("multer");

//TODO: make file extension and size validation a function
// Avatar upload
const avatarMaxSize = 1 * 1024 * 1024;
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+".jpg");
  },
});

const avatarFilefilter = (req, file, cb) => {
  if (
    file.mimetype != "image/png" &&
    file.mimetype != "image/jpg" &&
    file.mimetype != "image/jpeg"
  ) {
    req.ValidationError =
      "File type Error. Please upload a file with the right format (png, jpg, jpeg).";
    return cb(null, false, req.ValidationError);
  }

  if (file.size > avatarMaxSize) {
    req.ValidationError =
      "File too large. Please upload a file that is less than 1Mb.";
    return cb(null, false, req.ValidationError);
  }
  return cb(null, true);
};
const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: avatarFilefilter,
});

// Post Upload
const postImageMaxSize = 1 * 1024 * 1024;
const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.posterId + Date.now() + ".jpg");
  },
});

const postImageFilefilter = (req, file, cb) => {
  if (
    file.mimetype != "image/png" &&
    file.mimetype != "image/jpg" &&
    file.mimetype != "image/jpeg"
  ) {
    req.ValidationError =
      "File type Error. Please upload a file with the right format (png, jpg, jpeg).";
    return cb(null, false, req.ValidationError);
  }

  if (file.size > postImageMaxSize) {
    req.ValidationError =
      "File too large. Please upload a file that is less than 1Mb.";
    return cb(null, false, req.ValidationError);
  }
  return cb(null, true);
};

const postImageUpload = multer({
  storage: postImageStorage,
  fileFilter: postImageFilefilter,
});

module.exports = { avatarUpload, postImageUpload };
