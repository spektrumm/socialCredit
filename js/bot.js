const discord = require('discord.js');
const fs = require('fs');

const client = new discord.Client();
const prefix = '-soc';

client.once('ready', () => {
    console.log("socialCredit is online!")
});

//function retunrs all messages from channelID sent by specified userID
//if userID is '-1' function returns all messages from all users.
async function getAllChannelMessages(guildId, channelId){
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

async function getAllMessages(guildId){
    const guild = await client.guilds.fetch(guildId);
    guild.channels.cache.forEach(channel => {
        if(channel.type === 'text'){ 
            console.log('fetching - ' + channel.name);
            getAllChannelMessages(guildId, channel.id);
        }
    });
};

//reacting to new messages
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(args[0] === 'getAllMessages'){
        console.log('getting all messages');
        getAllMessages('562501878903078922');
        console.log('all messages fetched');
    }
    
});


client.login('OTYwMjk0MzI5Nzc4MzMxNzA4.YkoVyQ.32L_pqPkLA7QWAvLkTeMGZvp3GM');
