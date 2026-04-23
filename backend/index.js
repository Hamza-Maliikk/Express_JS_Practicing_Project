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
const { Addkey, fetchKey, decryptApiKey } = require("./controllers/key");
const Key = require("./models/key");
const OpenAI = require("openai");
const http = require("http");
const { Server } = require("socket.io");

let moonshot;

async function initAI() {
  const keyDoc = await Key.findOne().sort({ _id: -1 }); // DB se latest key lo
  const decryptedKey = decryptApiKey(keyDoc.key); // 🔓 decrypt

  if (!keyDoc) {
    console.log("❌ Koi key nahi mili — pehle /api/save-key se key save karo!");
    return;
  }

  moonshot = new OpenAI({
    apiKey: decryptedKey, // ✅ DB wali decrypted key
    baseURL: "https://api.moonshot.ai/v1",
  });
  console.log("AI ready");
}

const port = 8000;
const app = express();
let adminOnline = false;
let adminSocketId = null;

// ✅ OpenAI reply function
async function getAIReply(userMessage) {
  try {
    const completion = await moonshot.chat.completions.create({
      model: "kimi-k2.5",
      messages: [
        {
          role: "system",
          content:
            "Tum ek portfolio website ka helpful chat assistant ho. Sirf final jawab do. Reasoning mat do. Short reply (2-3 lines max).",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 150,
    });

    const message = completion.choices[0].message;

    // ✅ handle empty content issue
    let reply =
      message.content && message.content.trim() !== ""
        ? message.content
        : message.reasoning_content || "Sorry, reply generate nahi hua.";

    return reply;
  } catch (err) {
    console.error("Moonshot error:", err.message);
    return "Sorry, abhi reply nahi de sakta. Thodi der baad try karo!";
  }
}

// socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-admin", () => {
    socket.join("admin-room");
    adminOnline = true;
    adminSocketId = socket.id;
    console.log("Admin ONLINE:", socket.id);
  });

  socket.on("user-message", async (data) => {
    console.log("Admin online status:", adminOnline);
    console.log("Message from user:", data);

    if (adminOnline) {
      console.log("Admin online — message forward kar raha hun");
      io.to("admin-room").emit("receive-message", {
        ...data,
        userId: socket.id,
      });
    } else {
      console.log("Admin offline — OpenAI reply karega");
      const aiReply = await getAIReply(data.text);
      console.log("AI Reply:", aiReply);
      socket.emit("receive-reply", aiReply);
    }
  });

  socket.on("admin-reply", (data) => {
    console.log("Reply from admin:", JSON.stringify(data));
    io.to(data.userId).emit("receive-reply", data.text);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    if (socket.id === adminSocketId) {
      adminOnline = false;
      adminSocketId = null;
      console.log("Admin OFFLINE!");
    }
  });
});

// connection

// middleware
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/user/", userData);
app.post("/api/user", addUser);

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

app.get("/api/about", getAbout);
app.post("/api/about", authChecker, AddAbout);
app.put("/api/about/:id",authChecker, updateAbout);
app.delete("/api/about/skill/:skill", deleteSkill);
app.get("/api/projects", getProjects);
app.post("/api/projects", AddProject);
app.put("/api/projects/:id", updateProject);
app.delete("/api/projects/:id", deleteProject);
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.post("/", loginUser);
app.get("/dashboard", authChecker, userData);
app.get("/api/categories", getCategories);
app.post("/api/categories", AddCategory);
app.put("/api/categories/:id", updateCategory);
app.delete("/api/categories/:id", deleteCategory);
app.get("/api/blogs", getBlogs);
app.post("/api/blogs", upload.single("image"), AddBlog);
app.put("/api/blogs/:id", upload.single("image"), updateBlog);
app.delete("/api/blogs/:id", deleteBlog);
// Education
app.get("/api/education", getEducation);
app.post("/api/education", AddEducation);
app.put("/api/education/:id", updateEducation);
app.delete("/api/education/:id", deleteEducation);
// Contact
app.get("/api/contact", getContact);
app.post("/api/contact", AddContact);
app.get("/api/details", getDetails);
app.post("/api/details", AddDetails);
app.put("/api/details/:id", UpdateDetails);
app.delete("/api/details/:id", deleteDetails);
app.get("/api/home", getHome);
app.post("/api/home", uploadHome.single("image"), AddHome);
app.put("/api/home/:id", uploadHome.single("image"), UpdateHome);
app.delete("/api/home/:id", deleteHome);
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
app.get("/api/resume", getResume);
app.post("/api/resume", uploadResume.single("pdf"), addResume);
app.put("/api/resume/:id", uploadResume.single("pdf"), updateResume);
app.delete("/api/resume/:id", deleteResume);
app.get("/api/messages", getMessages);
app.post("/api/messages", uploadChat.array("file", 5), AddMessage);

// save key
app.post("/api/save-key", Addkey);
app.get("/api/save-key", fetchKey);

connectToDatabase(process.env.MONGO_URI).then(async () => {
  await initAI();
  server.listen(port, () => {
    console.log(`Server and Socket running at http://localhost:${port}`);
  });
});
