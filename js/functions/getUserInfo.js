const dbQuery = require("./dbQuery");

//get the users info
module.exports = async function (userName, db) {
  let sql = `SELECT score, messageStreak, rank FROM users WHERE name = ?`;
  return await dbQuery(db, sql, [userName]);
};
