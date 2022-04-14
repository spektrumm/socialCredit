const getUserFromMention = require('../functions/getUserFromMention.js');
import scoreFromDB from '.../functions/scoreFunctions.js';

module.exports.run = async (client, message, cmd, args, db) => { // why do we need cmd arg here?
    /*
    //update score values from legacy scores
    let user = getUserFromMention.run(client, args[0]);
    let userId = user.id;
    let guildMember = message.guild.member(userId);
    let displayName = guildMember.displayName;

    
    let sql = `SELECT score FROM users WHERE userId = ${userId}`;
    db.query(sql, function(err, result, fields) {
        if(err){
            throw err
        }
        let score = result[0].score;
    });

    */

    userScore = scoreFromDB(client, message, args, db);
    message.channel.send(`<@${userId}>'s Social Credit is ${userScore}.`);
    
};




module.exports.help = {
    name: 'getSocialCredit',
    aliases: ['gsc']
};
