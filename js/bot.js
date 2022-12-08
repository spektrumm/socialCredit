const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
const newMessage = require("./functions/newMessage.js");
const newMessageBulk = require("./functions/newMessageBulk.js");
const joinVoice = require("./functions/joinVoiceChannel");
const handleVoiceChannel = require("./functions/handleVoiceChannel");
const handleAudioConnections = require("./functions/handleAudioConnections");
const { performance } = require("perf_hooks");
const vader = require("vader-sentiment");
const botToken = require("./discordBotToken.json");

const client = new Discord.Client({ fetchAllMembers: true });
const PREFIX = "&";
currentConnections = [];

//load db config
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "nodemysql",
});

//Connect to mysql environment
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

client.commands = new Map();

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);

  client.user.setActivity("with Zane's feelings | &help", { type: "PLAYING" });

  fs.readdir("./commands/", (error, files) => {
    if (error) throw error;

    files.forEach((file) => {
      if (!file.endsWith(".js")) return;

      try {
        const properties = require(`./commands/${file}`);

        properties.help.aliases.forEach((alias) => {
          client.commands.set(alias, properties);
        });

        client.commands.set(properties.help.name, properties);
      } catch (error) {
        throw error;
      }
    });
  });
});

client.on("message", (message) => {
  const embed = new Discord.MessageEmbed().setAuthor("").setColor("#32CD32");

  if (message.content[0] == PREFIX) {
    var args = message.content.substring(1).split(" ");

    // `Cmd` definition
    var cmd = args.shift();

    const command = client.commands.get(cmd);
    if (command) command.run(client, message, cmd, args, db, vader);

    if (!command) {
      embed.setDescription(`
            The command: \`${PREFIX}${cmd}\` is not recognised. 
            
            The prefix for this server is: \`${PREFIX}\`
            For a list of commands, use \`${PREFIX}\`help`);

      return message.channel.send(embed);
    }
  } else {
    newMessage(client, message, cmd, args, db, vader);
  }
});

client.on("voiceStateUpdate", async (oldVoiceState, voiceState) => {
  let connection = null;
  let currentChannel = null;
  //if bot is not in a channel
  if (currentChannel === null) {
    await joinVoice(voiceState, 0, client).then(async (newChannel) => {
      if (newChannel !== false) {
        currentChannel = newChannel.channel;
        connection = newChannel.connection;
        currentConnections = await handleAudioConnections(
          connection,
          currentChannel,
          currentConnections
        );
        // ).then((connections) => {
        //   currentConnections = connections;
        //   console.log("test1");
        // });
      }
    });
  } else {
    let currentChannelSize = currentChannel.members.size;
    await joinVoice(voiceState, currentChannelSize, client).then(
      async (newChannel) => {
        if (newChannel !== false) {
          currentChannel = newChannel;
          connection = newChannel.connection;
          currentConnections = await handleAudioConnections(
            connection,
            currentChannel,
            currentConnections
          );
          // ).then((connections) => {
          //   currentConnections = connections;
          // });
        }
      }
    );
  }
  if (currentChannel !== null && currentChannel.members.size <= 1) {
    console.log("leaving", currentChannel.id);
    currentChannel.leave();
    currentChannel = null;
    connection = null;
  }
  // console.log(currentConnections);

  // if (
  //   oldVoiceState.channelID !== voiceState.channelID &&
  //   voiceState.channelID === null
  // ) {
  //   console.log("test", currentConnections);

  //   currentConnections.forEach((connection, index) => {
  //     console.log(connection.userId === voiceState.member.user.id);
  //     if (connection.userId === voiceState.member.user.id) {
  //       connection.receiver.end();
  //       connection.receiver.pipe(
  //         fs.createWriteStream(`${connection.userId}-audio.pcm`)
  //       );
  //       currentConnections.splice(index);
  //     }
  //   });
  // }
});

client.login(botToken.token);
