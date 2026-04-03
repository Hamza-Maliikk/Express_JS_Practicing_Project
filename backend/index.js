const express = require("express");
const {connectToDatabase} = require("./connection");
const {ReqResLogger} = require("./middleware");
const fs = require("fs");
const {userData, addUser, deleteUser, registerUser, loginUser} = require("./controllers/user");
const {authChecker} = require("./middleware/index");
const app = express();
const cors = require("cors");  
const port = 8000;

//connection
connectToDatabase('mongodb://127.0.0.1:27017/https-reqest');

// middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.get("/api/user/", userData);
app.post("/api/user", addUser);
app.post("/api/register", registerUser);
app.post("/", loginUser)
app.get("/dashboard", authChecker, userData)
//   users[user] = { ...users[user], ...req.body };
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json("User Edit successfully");
//   });
// });

app.delete("/api/user/:id", deleteUser);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
