require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

app = express();
app.use(express.json());

//Posts simulation
const posts = [
  {
    username: "Jesus",
    title: "Post 1",
  },
  {
    username: "Eduardo",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  //...Authenticate User...

  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log(req.headers);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("server running");
});
