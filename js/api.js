const app = require("express")();
const mysql = require("mysql");
const getTopUsers = require("./functions/getTopUsers.js");
const getBottomUsers = require("./functions/getBottomUsers.js");
const getUsersByName = require("./functions/getUsersByName.js");
const getUserDataByName = require("./functions/getUserDataByName.js");

const cors = require("cors");
const PORT = 8080;

app.use(cors());

//load db config

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "nodemysql",
});

//Connect to mysql environment
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`));

app.get("/data/getTopUsers", (req, res) => {
  getTopUsers(db)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => console.log("error -- ", e));
});

app.get("/data/getBottomUsers", (req, res) => {
  getBottomUsers(db)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => console.log("error -- ", e));
});

app.get("/data/getUsers/:userName", (req, res) => {
  const userName = req.params.userName;
  getUsersByName(userName, db)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => console.log("error -- ", e));
});

app.get("/data/getUserData/:userName", (req, res) => {
  const userName = req.params.userName;
  getUserDataByName(userName, db)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => console.log("error -- ", e));
});
