const Discord = require("discord.js");
const fs = require('fs');
const newMessage = require('../functions/newMessage.js');
const {performance}  = require('perf_hooks');





async function getAllChannelMessages(client, guildId, channelId, db, vader){
    const guild = await client.guilds.fetch(guildId);
    const channel = guild.channels.cache.get(channelId);
    const messages = [];
    let message = await channel.messages.fetch({limit: 1})
        .then(messageFetch => (messageFetch.size === 1 ? messageFetch.first() : null))
    messages.push(message);

    while(message){
        await channel.messages.fetch({limit: 100, before: message.id})
            .then(messageFetch => {
                messageFetch.forEach(msg => {
                    if(!(msg.author.bot)){
                        //let startTime = performance.now();
                        newMessage(client, msg, db, vader)
                        //let endTime = performance.now();
                        //console.log(endTime-startTime);
                    }
                //updating pointer
                })
                message = 0 < messageFetch.size ? messageFetch.last() : null;
            })
        }

    // let messagesJson = JSON.stringify(messages);

    // fs.writeFile(`D:\\repos\\socialCredit\\legacyFiles\\getAllMsgs\\${channel.name}_messages.json`, messagesJson, err => {
    //     if(err){
    //         console.error(err);
    //         return;
    //     }
    // });
    // console.log('...done');
};

module.exports.run = async (client, message, cmd, args, db, vader) => {
    let guildId = args;
    const guild = await client.guilds.fetch(guildId);
    console.log('test');
    guild.channels.cache.forEach(channel => {
        if(channel.type === 'text'){ 
            if(channel.name != 'botspam'){

                console.log('fetching - ' + channel.name);
                getAllChannelMessages(client, guildId, channel.id, db, vader);
            }
        }
    });
    console.log('AllDone');
};

module.exports.help = {
    name: 'getAllMessages',
    aliases: ['getAllMsgs']
};