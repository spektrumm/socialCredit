const dbQuery = require("./dbQuery");

module.exports = async function (userName, db) {
  let sql = `SELECT userId FROM users WHERE name = ?`;
  const result = await dbQuery(db, sql, [userName]);
  const userId = result[0].userId;
  let sql2 = `SELECT score, timestamp FROM messages WHERE userId = ? ORDER BY score ASC`;
  console.log(userId);
  return await dbQuery(db, sql2, [userId]);
};
