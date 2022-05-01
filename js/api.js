const app = require("express")();
const mysql = require("mysql");
const getTopUsers = require("./functions/getTopUsers.js");
const getBottomUsers = require("./functions/getBottomUsers.js");

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
  getTopUsers(db).then((data) => {
    res.send(data);
  });
});

app.get("/data/getBottomUsers", (req, res) => {
  getBottomUsers(db).then((data) => {
    res.send(data);
  });
});
