require("dotenv").config();
const express = require("express");
const { connectToDatabase } = require("./connection");
const {
  userData,
  addUser,
  deleteUser,
  registerUser,
  loginUser,
} = require("./controllers/user");
const { authChecker } = require("./middleware/index");
const {
  AddEducation,
  getEducation,
  updateEducation,
  deleteEducation,
} = require("./controllers/education");
const cors = require("cors");
const {
  getBlogs,
  AddBlog,
  updateBlog,
  deleteBlog,
} = require("./controllers/blog");
const {
  getCategories,
  AddCategory,
  updateCategory,
  deleteCategory,
} = require("./controllers/categories");
const {
  upload,
  uploadHome,
  uploadTestimonial,
  uploadResume,
  uploadChat,
} = require("./middleware/multer");
const {
  AddAbout,
  getAbout,
  updateAbout,
  deleteSkill,
} = require("./controllers/about");
const {
  getProjects,
  AddProject,
  updateProject,
  deleteProject,
} = require("./controllers/work");
const { getContact, AddContact } = require("./controllers/contact");
const {
  getDetails,
  AddDetails,
  UpdateDetails,
  deleteDetails,
} = require("./controllers/details");
const {
  getHome,
  AddHome,
  UpdateHome,
  deleteHome,
} = require("./controllers/home");
const {
  getTestimonials,
  AddTestimonial,
  UpdateTestimonial,
  deleteTestimonial,
} = require("./controllers/testimonial");
const {
  getResume,
  addResume,
  updateResume,
  deleteResume,
} = require("./controllers/resume");
const { getMessages, AddMessage } = require("./controllers/message");
const http = require("http");
const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const port = 8000;
const app = express();
let adminOnline = false; // Admin online status track karne ke liye variable

// Gemini ka respnse kai liay
async function getGeminiReply(userMessage) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      Tum ek portfolio website ka helpful chat assistant ho.
      User ne yeh message bheja: "${userMessage}"
      Short aur helpful reply do (2-3 lines max).
    `;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini error:", err);
    return "Sorry, abhi reply nahi de sakta. Thodi der baad try karo!";
  }
}
// socket for chatbot
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // admin join room
  socket.on("join-admin", () => {
    socket.join("admin-room");
    adminOnline = true; // Admin online ho gaya
    console.log("Admin joined admin-room:", socket.id);
  });

  // ✅ Fix
  socket.on("user-message", async (data) => {
    console.log("Admin online status:", adminOnline);
    console.log("Message from user:", data);

    if (adminOnline) {
      console.log("Admin online — message forward kar raha hun");
      io.to("admin-room").emit("receive-message", data);
    } else {
      console.log("Admin offline — Gemini reply karega");
      const aiReply = await getGeminiReply(data.text);
      io.to(data.userId).emit("receive-reply", aiReply);
    }
  });

  // admin reply
  socket.on("admin-reply", (data) => {
    console.log("Reply from admindata:", JSON.stringify(data));
    console.log("Reply from admin to:", data.userId);
    io.to(data.userId).emit("receive-reply", data.text);
  });

  // ✅ Fix
  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    if (socket.rooms.has("admin-room")) {
      adminOnline = false;
      console.log("Admin OFFLINE!");
    }
  });
});

//connection
connectToDatabase(process.env.MONGO_URI);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/user/", userData);
app.post("/api/user", addUser);

// combined fr homepage
app.get("/api/homepage", async (req, res) => {
  try {
    const [home, testimonials, resume, work] = await Promise.all([
      require("./models/home").find(),
      require("./models/testimonials").find(),
      require("./models/resume").find(),
      require("./models/work").find(),
    ]);
    res.status(200).json({ home, testimonials, resume, work });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// portfolio about
app.get("/api/about", getAbout);
app.post("/api/about", AddAbout);
app.put("/api/about/:id", updateAbout);
app.delete("/api/about/skill/:skill", deleteSkill);

// Work projects
app.get("/api/projects", getProjects);
app.post("/api/projects", AddProject);
app.put("/api/projects/:id", updateProject);
app.delete("/api/projects/:id", deleteProject);
// Login user
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.post("/", loginUser); // backward compatibility with existing frontend
app.get("/dashboard", authChecker, userData);

//   users[user] = { ...users[user], ...req.body };
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json("User Edit successfully");
//   });
// });
// categries routes
app.get("/api/categories", getCategories);
app.post("/api/categories", AddCategory);
app.put("/api/categories/:id", updateCategory);
app.delete("/api/categories/:id", deleteCategory);
// blog routes
app.get("/api/blogs", getBlogs);
app.post("/api/blogs", upload.single("image"), AddBlog);
app.put("/api/blogs/:id", upload.single("image"), updateBlog);
app.delete("/api/blogs/:id", deleteBlog);
// education routes
app.get("/api/education", getEducation);
app.post("/api/education", AddEducation);
app.put("/api/education/:id", updateEducation);
app.delete("/api/education/:id", deleteEducation);

// contact
app.get("/api/contact", getContact);
app.post("/api/contact", AddContact);
// details
app.get("/api/details", getDetails);
app.post("/api/details", AddDetails);
app.put("/api/details/:id", UpdateDetails);
app.delete("/api/details/:id", deleteDetails);
// home
app.get("/api/home", getHome);
app.post("/api/home", uploadHome.single("image"), AddHome);
app.put("/api/home/:id", uploadHome.single("image"), UpdateHome);
app.delete("/api/home/:id", deleteHome);
// testimonial section
app.get("/api/testimonials", getTestimonials);
app.post(
  "/api/testimonials",
  uploadTestimonial.single("image"),
  AddTestimonial,
);
app.put(
  "/api/testimonials/:id",
  uploadTestimonial.single("image"),
  UpdateTestimonial,
);
app.delete("/api/testimonials/:id", deleteTestimonial);
// resume
app.get("/api/resume", getResume);
app.post("/api/resume", uploadResume.single("pdf"), addResume);
app.put("/api/resume/:id", uploadResume.single("pdf"), updateResume);
app.delete("/api/resume/:id", deleteResume);

// message
app.get("/api/messages", getMessages);
app.post("/api/messages", uploadChat.array("file", 5), AddMessage);
// Port

server.listen(port, () => {
  console.log(`Server and Socket running at http://localhost:${port}`);
});
