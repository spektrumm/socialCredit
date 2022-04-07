const discord = require('discord.js');

const client = new discord.Client();
const prefix = '-soc';

client.once('ready', () => {
    console.log("socialCredit is online!")
});

//function retunrs all messages from channelID sent by specified userID
//if userID is '-1' function returns all messages from all users.
function getAllMessages(channelID, userID){
    const channel = client.channel.cache.get(channelID);
    let messages = [];
    let message = await channel.messages.fetch({limit:1})
        .then(messagePage => (messagePage === 1 ? messagePage.at(0) : null));

    while(message){
        await channel.messages.fetch({limit:100})
            .then(messagePage => {
                messagePage.forEach(msg => storeMessage(msg, messages));

                message = 0 < messagePage.size ? messagePage.at(messagePage.size -1) : null;
            })
    }
    return messages;
};

//storeMessage stores msg into the messages array according to user ID
function storeMessage(msg, messages){
    let accountID = msg.author.id;
    let message = msg.content;

    console.log(user, message);

    let index = messages.indexOf(user);
    //first message from this user
    if(index === -1){
        messages.push({user: accountID, messages: [message]})
    }else{
        messages[index] = {user: accountID, messages: [messages.split(), message]};
    }
}

//storeMessagesToJSON converts messages to JSON type
function storeMessagesToJSON(messages){
    let messageJSON = JSON.stringify(messages);
    return messageJSON;
}


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    console.log(args.length);
    const command = args.shift().toLowerCase();

    if(command === 'credit' && args.length > 2){
        // if(args.length > 3){

        // }
        
        if(isNaN(args[2])){
            addTextToImage("./+credit.jpg", args[2])

        }
        
    }

});


client.login('OTYwMjk0MzI5Nzc4MzMxNzA4.YkoVyQ.32L_pqPkLA7QWAvLkTeMGZvp3GM');
