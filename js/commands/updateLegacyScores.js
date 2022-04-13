const mysql = require('mysql');
const jsonData = require('D:\\repos\\socialCredit\\legacyFiles\\legacyScores2.json');


module.exports.run = async (client, message, cmd, args, db) => {
    //update score values from legacy scores
    jsonData.forEach(user => {
        let userId = user.authorID;
        let score = Math.round(user.score);
        let sql = `UPDATE users SET score = ${score} WHERE userId = ${userId}`;
        db.query(sql, err=> {
            if(err){
                throw err
            }
        });
        
    });

};

module.exports.help = {
    name: 'updateLegacyScores',
    aliases: ['updLgScrs']
};
