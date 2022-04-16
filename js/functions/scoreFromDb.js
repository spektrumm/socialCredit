const dbQuery = require('.../functions/dbQuery.js');

module.exports = async function (client, args, db, userID){

    let sql = `SELECT score FROM users WHERE userId = ${userID}`;
    /*
    await db.query(sql, function(err, result, fields) {
        if(err){
            throw err
        }
        let userScore = result[0].score;
        return userScore; 

    });
    */
    let userScore = await dbQuery(db, sql)[0].score;

    return userScore;
}