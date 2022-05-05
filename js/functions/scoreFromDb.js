const dbQuery = require('./dbQuery');

//returns userID's score from db
module.exports = async function (client, args, db, userID){

    let sql = `SELECT score FROM users WHERE userId = ${userID}`;

    return dbQuery(db, sql);
}