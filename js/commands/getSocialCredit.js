const getUserFromMention = require('../functions/getUserFromMention.js');

module.exports.run = async (client, message, cmd, args, db) => {
    
    //update score values from legacy scores
    let user = getUserFromMention(client, args[0]);
    let userId = user.id;
    let guildMember = message.guild.member(userId);
    let displayName = guildMember.displayName;

    
    let sql = `SELECT score FROM users WHERE userId = ${userId}`;
    db.query(sql, function(err, result, fields) {
        if(err){
            throw err
        }
        let score = result[0].score;
        
        message.channel.send(`<@${userId}>'s Social Credit is ${score}.`);
    });
};




module.exports.help = {
    name: 'getSocialCredit',
    aliases: ['gsc']
};
