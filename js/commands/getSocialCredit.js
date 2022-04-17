const scoreFromDb = require('../functions/scoreFromDb.js');
const getUserFromMention = require('../functions/getUserFromMention.js');

//sends a message with user's score to channel.
module.exports.run = async (client, message, cmd, args, db) => {
    let user = getUserFromMention(client, args[0]);
    let userID = user.id;

    await scoreFromDb(client, args, db, userID).then( result => {
        let score = result[0].score;
        message.channel.send(`<@${userID}>'s Social Credit is ${score}.`)

    });
   // console.log(userScore);
};

module.exports.help = {
    name: 'getSocialCredit',
    aliases: ['gsc']
};
