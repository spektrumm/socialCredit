const scoreFromDb = require('.../functions/scoreFromDb.js');

//sends a message with user's score to channel.
module.exports.run = async (client, message, cmd, args, db) => {
    let user = getUserFromMention.run(client, args[0]);
    let userID = user.id;

    userScore = scoreFromDb(client, args, db, userID);
    message.channel.send(`<@${userID}>'s Social Credit is ${userScore}.`);
    
};

module.exports.help = {
    name: 'getSocialCredit',
    aliases: ['gsc']
};
