const dbQuery = require("./dbQuery");

module.exports = async function (userName, db) {
  let sql = `SELECT name FROM users WHERE name LIKE ? ORDER BY name ASC LIMIT 5 `;
  let usersReformat = [];
  const users = await dbQuery(db, sql, ["%" + userName + "%"]);

  users.forEach((user) => {
    const name = user.name;
    usersReformat.push({ name });
  });

  return usersReformat;
};
