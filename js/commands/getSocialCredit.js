const scoreFromDb = require('.../functions/scoreFromDb.js');

//sends a message with user's score to channel.
module.exports.run = async (client, message, cmd, args, db) => {

    userScore = scoreFromDb(client, args, db);
    message.channel.send(`<@${userId}>'s Social Credit is ${userScore}.`);
    
};

module.exports.help = {
    name: 'getSocialCredit',
    aliases: ['gsc']
};
