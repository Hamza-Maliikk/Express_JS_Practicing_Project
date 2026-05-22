import multer from "multer";
import path from "path";
import fs from "fs";
import cloudinary from "../cloudinary/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Home
const homeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "home",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});
const uploadHome = multer({ storage: homeStorage });

// Testimonials
const testimonialStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "testimonials",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});
const uploadTestimonial = multer({ storage: testimonialStorage });

// Resume
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resume",
    resource_type: "auto",
    allowed_formats: ["pdf", "doc", "docx"],
  },
});
const uploadResume = multer({ storage: resumeStorage });

// Chat
const ChatStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "chat",
    resource_type: "auto",
    allowed_formats: ["jpeg", "png", "pdf", "doc", "docx"],
  },
});
const uploadChat = multer({ storage: ChatStorage });

export { upload, uploadHome, uploadTestimonial, uploadResume, uploadChat };