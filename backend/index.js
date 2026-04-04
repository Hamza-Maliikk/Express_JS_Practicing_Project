const express = require("express");
const {connectToDatabase} = require("./connection");
const {userData, addUser, deleteUser, registerUser, loginUser} = require("./controllers/user");
const {authChecker} = require("./middleware/index");
const { AddEducation, getEducation, updateEducation, deleteEducation } = require("./controllers/education");
const app = express();
const cors = require("cors");  
const { getBlogs, AddBlog, updateBlog, deleteBlog } = require("./controllers/blog");
const port = 8000;

//connection
connectToDatabase('mongodb://127.0.0.1:27017/https-reqest');

// middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.get("/api/user/", userData);
app.post("/api/user", addUser);

// Login user
app.post("/api/register", registerUser);
app.post("/", loginUser)
app.get("/dashboard", authChecker, userData);

//   users[user] = { ...users[user], ...req.body };
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json("User Edit successfully");
//   });
// });

app.delete("/api/user/:id", deleteUser);
// blog routes
app.get("/api/blogs", getBlogs)
app.post("/api/blogs", AddBlog)
app.put("/api/blogs/:id", updateBlog)
app.delete("/api/blogs/:id", deleteBlog)
// education routes
app.get("/api/education",  getEducation)
app.post("/api/education", AddEducation )
app.put("/api/education/:id",  updateEducation)
app.delete("/api/education/:id",  deleteEducation)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
