const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");
const pkg  = require("multer-storage-cloudinary");
const CloudinaryStorage = pkg.CloudinaryStorage;


const uploadDir = path.resolve(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
// ── "home" folder Cloudinary mein ──
const homeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          "home",                          // ← alag folder home ke liye
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation:  [{ width: 800, crop: "limit" }],
  },
});
const uploadHome = multer({ storage: homeStorage });
// testmonial
const testimonialStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          "testimonials",                  // ← alag folder testimonials ke liye
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation:  [{ width: 800, crop: "limit" }],
  },
});
const uploadTestimonial = multer({ storage: testimonialStorage   });
module.exports = { upload, uploadHome, uploadTestimonial };