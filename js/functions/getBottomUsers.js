const dbQuery = require("./dbQuery");

//get 10 users with the lowest score + reformat data for leaderboard
module.exports = async function (db) {
  let sql = `SELECT name, score FROM users ORDER BY score ASC LIMIT 10`;
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
