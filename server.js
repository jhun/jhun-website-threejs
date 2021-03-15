const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
const port = 3000;

// create application/json parser
// var jsonParser = bodyParser.json();

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.get("/ping", function (req, res) {
//   return res.send("pong");
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/works", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/lab", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/send", (req, res, next) => {
  // console.log(req.body);
  const nome = req.body.name;
  const email = req.body.email;
  const mensagem = req.body.message;
  require("./nodemail")(email, nome, mensagem)
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

app.listen(port, function () {
  console.log("Listening on port " + port); //Listening on port
});
