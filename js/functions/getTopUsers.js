const dbQuery = require("./dbQuery");

module.exports = async function (db) {
  let sql = `SELECT name, score FROM users ORDER BY score DESC LIMIT 10`;
  let usersReformat = [];
  let place = 1;

  const users = await dbQuery(db, sql);

  users.forEach((user) => {
    const name = user.name;
    const score = user.score;
    usersReformat.push({ place, name, score });
    place++;
  });

  return usersReformat;
};
