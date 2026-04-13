require("dotenv").config();
const express = require("express");
const {connectToDatabase} = require("./connection");
const {userData, addUser, deleteUser, registerUser, loginUser} = require("./controllers/user");
const {authChecker} = require("./middleware/index");
const { AddEducation, getEducation, updateEducation, deleteEducation } = require("./controllers/education");
const app = express();
const cors = require("cors");  
const { getBlogs, AddBlog, updateBlog, deleteBlog } = require("./controllers/blog");
const { getCategories, AddCategory, updateCategory, deleteCategory } = require("./controllers/categories");
const { upload, uploadHome } = require("./middleware/multer");
const { AddAbout, getAbout, updateAbout, deleteSkill } = require("./controllers/about");
const { getProjects, AddProject, updateProject, deleteProject } = require("./controllers/work");
const { getContact, AddContact } = require("./controllers/contact");
const { getDetails, AddDetails, UpdateDetails, deleteDetails } = require("./controllers/details");
const { getHome, AddHome, UpdateHome, deleteHome } = require("./controllers/home");
const port = 8000;

//connection
connectToDatabase(process.env.MONGO_URI);

// middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.get("/api/user/", userData);
app.post("/api/user", addUser);

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
app.post("/api/login", loginUser)
app.post("/", loginUser) // backward compatibility with existing frontend
app.get("/dashboard", authChecker, userData);



//   users[user] = { ...users[user], ...req.body };
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json("User Edit successfully");
//   });
// });
// categries routes
app.get("/api/categories", getCategories)
app.post("/api/categories", AddCategory)
app.put("/api/categories/:id", updateCategory)
app.delete("/api/categories/:id", deleteCategory)
// blog routes
app.get("/api/blogs", getBlogs)
app.post("/api/blogs",upload.single('image'), AddBlog)
app.put("/api/blogs/:id", upload.single('image'), updateBlog)
app.delete("/api/blogs/:id", deleteBlog)
// education routes
app.get("/api/education",  getEducation)
app.post("/api/education", AddEducation )
app.put("/api/education/:id",  updateEducation)
app.delete("/api/education/:id",  deleteEducation)

// contact
app.get("/api/contact", getContact)
app.post("/api/contact", AddContact)
// details
app.get("/api/details", getDetails)
app.post("/api/details", AddDetails)
app.put("/api/details/:id", UpdateDetails)
app.delete("/api/details/:id", deleteDetails)
// home
app.get("/api/home", getHome)
app.post("/api/home",uploadHome.single('image'), AddHome)
app.put("/api/home/:id", uploadHome.single('image'), UpdateHome)
app.delete("/api/home/:id", deleteHome)
// Port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
