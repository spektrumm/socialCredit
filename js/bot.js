const discord = require('discord.js');

const client = new discord.Client();
const prefix = '-soc';

client.once('ready', () => {
    console.log("socialCredit is online!")
});

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
