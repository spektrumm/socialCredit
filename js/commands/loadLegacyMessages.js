const Discord = require("discord.js");
const fs = require('fs');
const messageJson = require('D:\\repos\\socialCredit\\legacyFiles\\messageLog.json');
const userJson = require('D:\\repos\\socialCredit\\legacyFiles\\users.json');



module.exports.run = async (client, message, cmd, args, db) => {
    let validUserIds = [];
    
    userJson.forEach(user =>{
        validUserIds.push(user.userId);
    });

    for(const msg in messageJson){
        let messageId = messageJson[msg].messageId;
        let channelId = messageJson[msg].channelId;
        let userId = messageJson[msg].authorId;
        let rawScoreChange = messageJson[msg].scoreChange;
        let effectiveScoreChange = 0; //tbd by calculation scrip
        let score = 0; //pull from sql users score and add effective Score Change
        if(!validUserIds.includes(userId)){            
            continue;}

        client.channels.cache.get(channelId).messages.fetch(messageId)
        .then(messageObj => {

            let content = messageObj.cleanContent; //clean content converts mentions to names
            let timestamp = messageObj.createdTimestamp;
    
            let post = [messageId, userId, content, rawScoreChange, effectiveScoreChange, score, timestamp];            
            let sql = `INSERT INTO messages (messageId, userId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES ?`;

            let query = db.query(sql, [[post]], err=>{
                if(err) {
                    throw err
                }
                
            })
            console.log(`${msg} -loaded`);
        })
    };





};

module.exports.help = {
    name: 'loadAllMessage',
    aliases: ['ldAllMsgs']
};