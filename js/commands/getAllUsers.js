const Discord = require("discord.js");
const fs = require('fs');

//fetches all users from discord guildId:args and appends them to users.json
module.exports.run = async (client, message, cmd, args, db) => {
    let users = [];
    const guild = await client.guilds.fetch(args);
    await guild.members.cache.forEach(member => {
        if(!member.user.bot){
            let user = {"userId": member.id, "name":member.user.username, "score":0, "multiplier":0, "lastMessageNegative":0, "lastMessagePositive":1};
            users.push(user);
        }
    });

    let usersJson = JSON.stringify(users);
    fs.writeFile('D:\\repos\\socialCredit\\legacyFiles\\users.json', usersJson, err => {
        if(err){
            console.error(err);
            return;
        }
    });
};

module.exports.help = {
    name: 'getAllUsers',
    aliases: ['getAllUsrs']
};