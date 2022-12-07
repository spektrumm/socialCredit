const dbQuery = require('./dbQuery');


module.exports = async function (db){

    let sql = `SELECT * FROM users`;

    return dbQuery(db, sql);
}