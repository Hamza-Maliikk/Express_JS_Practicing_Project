const express = require("express");
const {connectToDatabase} = require("./connection");
const {userData, addUser, deleteUser, registerUser, loginUser} = require("./controllers/user");
const {authChecker} = require("./middleware/index");
const { AddEducation, getEducation, updateEducation, deleteEducation } = require("./controllers/education");
const app = express();
const cors = require("cors");  
const { getBlogs, AddBlog, updateBlog, deleteBlog } = require("./controllers/blog");
const { getCategories, AddCategory, updateCategory, deleteCategory } = require("./controllers/categories");
const { upload } = require("./middleware/multer");
const { AddAbout, getAbout, updateAbout } = require("./controllers/about");
require("dotenv").config();
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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
