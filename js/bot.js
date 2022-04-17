const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const newMessage = require('./functions/newMessage.js');
const newMessageBulk = require('./functions/newMessageBulk.js');




const client = new Discord.Client({fetchAllMembers: true});
const PREFIX = '&';

//load db config
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//Connect to mysql environment  
db.connect(err => {
    if(err){
        throw err
    }
    console.log('MySql Connected');
});

client.commands = new Map();

client.on('ready', () =>
{
    console.info(`Logged in as ${client.user.tag}!`);

    client.user.setActivity("with Zane's feelings | &help", { type: 'PLAYING' });

    fs.readdir('./commands/', (error, files) =>
    {
        if (error) throw error;

        files.forEach(file =>
        {
            if (!file.endsWith('.js')) return;

            try
            {
                const properties = require(`./commands/${file}`);

                properties.help.aliases.forEach(alias =>
                {
                    client.commands.set(alias, properties);
                });

                client.commands.set(properties.help.name, properties);
            }
            catch (error)
            {
                throw error;
            }
        });
    });
});

client.on('message', message =>
{
    const embed = new Discord.MessageEmbed()
        .setAuthor("")
        .setColor("#32CD32");

    if (message.content[0] == PREFIX){

        var args = message.content.substring(1).split(" ");
    
        // `Cmd` definition
        var cmd = args.shift();
    
        const command = client.commands.get(cmd);
    
        if (command) command.run(client, message, cmd, args, db);
    
        if (!command)
        {
            embed.setDescription(`
            The command: \`${PREFIX}${cmd}\` is not recognised. 
            
            The prefix for this server is: \`${PREFIX}\`
            For a list of commands, use \`${PREFIX}\`help`
            );
    
            return message.channel.send(embed);
        }
    }else{//new message for sentiment analysis
        // if(message.content == 'BULK'){
        //     const file = require('../legacyFiles/messageLog-updatedRUN2.json');
        //     newMessageBulk(client, file, db)

        // }
        //newMessage(client, message, db);

    }

});



client.login('OTYwMjk0MzI5Nzc4MzMxNzA4.YkoVyQ.32L_pqPkLA7QWAvLkTeMGZvp3GM');
