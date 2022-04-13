const Discord = require("discord.js");
const fs = require('fs');




async function getAllChannelMessages(client, guildId, channelId){
    const guild = await client.guilds.fetch(guildId);
    const channel = guild.channels.cache.get(channelId);
    const messages = [];
    let message = await channel.messages.fetch({limit: 1})
        .then(messageFetch => (messageFetch.size === 1 ? messageFetch.first() : null))
    messages.push(message);

    while(message){
        await channel.messages.fetch({limit: 100, before: message.id})
            .then(messageFetch => {
                messageFetch.forEach(msg => messages.push(msg));

                //updating pointer
                message = 0 < messageFetch.size ? messageFetch.last() : null;
            })
    }

    let messagesJson = JSON.stringify(messages);

    fs.writeFile('/mnt/d/repos/socialCredit/messageJsons/' + channel.name + '_messages.json', messagesJson, err => {
        if(err){
            console.error(err);
            return;
        }
    });
    console.log('...done');
};

module.exports.run = async (client, message, cmd, args, db) => {
    let guildId = args;
    const guild = await client.guilds.fetch(guildId);
    guild.channels.cache.forEach(channel => {
        if(channel.type === 'text'){ 
            console.log('fetching - ' + channel.name);
            getAllChannelMessages(client, guildId, channel.id);
        }
    });
};

module.exports.help = {
    name: 'getAllMessages',
    aliases: ['getAllMsgs']
};