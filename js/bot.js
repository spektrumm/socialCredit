const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
const newMessage = require("./functions/newMessage.js");
const joinVoice = require("./functions/joinVoiceChannel");
const convertToWav = require("./functions/convertToWav.js");
const transcribe = require("./functions/transcribe.js");
const handleAudioConnections = require("./functions/handleAudioConnections");
const { performance } = require("perf_hooks");
const vader = require("vader-sentiment");
const botToken = require("./discordBotToken.json");

const client = new Discord.Client({ fetchAllMembers: true });
const PREFIX = "&";
let currentChannelSize = 0;
let currentConnection = null;
let currentChannel = null;
let receivers = new Map();

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
  if (voiceState.member.user.bot) {
    return;
  }
  let botConnections = client.voice.connections;
  if (voiceState.channel != null) {
    if (botConnections.size == 0) {
      await voiceState.channel
        .join()
        .then(() => console.log("Joined Channel"))
        .catch(() => console.log("Did not join"));
    } else {
      if (
        voiceState.channel.members.size >=
        botConnections.first().channel.members.size
      ) {
        await voiceState.channel
          .join()
          .then(() => console.log("Joined Channel"))
          .catch(() => console.log("Did not join"));
      }
    }
  }

  if (botConnections.size != 0) {
    botConnections.first().channel.members.forEach((member) => {
      if (member.user.bot) {
        return;
      }
      //create new connections
      if (!receivers.has(member.id)) {
        let receiver = botConnections.first().receiver.createStream(member, {
          mode: "pcm",
          end: "manual",
        });
        receiver.pipe(fs.createWriteStream(`${member.id}-audio.pcm`));
        console.log(member.id);
        receivers.set(member.id, receiver);
      }
    });
    let it = receivers[Symbol.iterator]();
    for (const item of it) {
      let memberId = item[0];
      console.log("searching for ", memberId);
      if (!botConnections.first().channel.members.has(memberId)) {
        console.log("not found");
        let receiver = receivers.get(memberId);
        receiver.end();
        receivers.delete(memberId);
        await new Promise((r) => setTimeout(r, 2000));
        convertToWav(`${memberId}-audio`);
        await new Promise((r) => setTimeout(r, 2000));

        console.log(transcribe(`${memberId}-audio.wav`));
      }
    }
  }

  if (
    botConnections.size != 0 &&
    botConnections.first().channel.members.size == 1
  ) {
    botConnections.first().channel.leave();
  }

  // } else if (oldVoiceState != null) {
  //   let channels = oldVoiceState.guild.channels.cache;
  //   channels.forEach(async (channel) => {
  //     if (channel.type == voice) {
  //       if (channel.members.size >= currentChannelSize) {
  //         currentChannelSize = channel.members.size;
  //         return await channel.join();
  //       }
  //     }
  //   });
  // }

  // if (voiceState != null) {
  //   if (currentConnection == null) {
  //     currentConnection = await joinVoice(voiceState, 0, client);
  //   } else {
  //     let connection = await joinVoice(
  //       voiceState,
  //       currentConnection.channel.members.size,
  //       client
  //     );
  //     if (connection != false) {
  //       currentConnection = connection;
  //     }
  //   }
  // }

  // if (
  //   currentConnection.channel != null &&
  //   currentConnection.channel.members.size <= 1 &&
  //   currentConnection.channel.members.at(0).user.bot == true
  // ) {
  //   console.log("Leaving Channel");
  //   currentConnection.channel.leave();
  //   currentConnection = null;
  // }
  // console.log(oldVoiceState.member.displayName, oldVoiceState.channel);
  // console.log(voiceState.member.displayName, voiceState.channel);

  // // console.log(currentChannel);

  // currentChannel.members.forEach((member) => {
  //   //create new connections
  //   if (!receivers.has(member.id)) {
  //     let receiver = currentConnection.receiver.createStream(member, {
  //       mode: "pcm",
  //       end: "manual",
  //     });
  //     receivers.set(member.id, receiver);
  //   }
  // });

  // let it = receivers[Symbol.iterator]();
  // for (const item of it) {
  //   let memberId = item[0];
  //   if (!currentChannel.members.has(memberId)) {
  //     let receiver = currentChannel.members.get(memberId);
  //     receiver.end();
  //     receiver.pipe(fs.createWriteStream(`${connection.userId}-audio.pcm`));
  //   }
  // }

  // let connection = null;
  // let currentChannel = null;
  // //if bot is not in a channel
  // if (currentChannel === null) {
  //   await joinVoice(voiceState, 0, client).then(async (newChannel) => {
  //     if (newChannel !== false) {
  //       currentChannel = newChannel.channel;
  //       connection = newChannel.connection;
  //       currentConnections = await handleAudioConnections(
  //         connection,
  //         currentChannel,
  //         currentConnections
  //       );
  //       // ).then((connections) => {
  //       //   currentConnections = connections;
  //       //   console.log("test1");
  //       // });
  //     }
  //   });
  // } else {
  //   let currentChannelSize = currentChannel.members.size;
  //   await joinVoice(voiceState, currentChannelSize, client).then(
  //     async (newChannel) => {
  //       if (newChannel !== false) {
  //         currentChannel = newChannel.channel;
  //         connection = newChannel.connection;
  //         currentConnections = await handleAudioConnections(
  //           connection,
  //           currentChannel,
  //           currentConnections
  //         );
  //         // ).then((connections) => {
  //         //   currentConnections = connections;
  //         // });
  //       }
  //     }
  //   );
  // }
  // if (currentChannel !== null && currentChannel.members.size <= 1) {
  //   console.log("leaving", currentChannel.id);
  //   currentChannel.leave();
  //   currentChannel = null;
  //   connection = null;
  // }
  // // console.log(currentConnections);

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
