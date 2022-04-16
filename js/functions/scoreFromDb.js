module.exports = async function (client, args, db, userID){

    let sql = `SELECT score FROM users WHERE userId = ${userID}`;
    await db.query(sql, function(err, result, fields) {
        if(err){
            throw err
        }
        let userScore = result[0].score;
        return userScore; 

    });
    return userScore;
}