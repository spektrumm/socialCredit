module.exports = async function (client, args, db){
    let user = getUserFromMention.run(client, args[0]);
    let userID = user.id;

    let sql = `SELECT score FROM users WHERE userId = ${userID}`;
    await db.query(sql, function(err, result, fields) {
        if(err){
            throw err
        }
        let score = result[0].score;
        return score; 

    });
}