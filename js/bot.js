const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
const newMessage = require("./functions/newMessage.js");
const joinVoice = require("./functions/joinVoiceChannel");
const convertToWav = require("./functions/convertToWav.js");
const transcribe = require("./functions/transcribe.js");
const handleAudioConnections = require("./functions/handleAudioConnections");
const joinVoiceChannel = require("./functions/joinVoiceChannel");

const handleAsyncVoiceStreams = require("./functions/handleVoiceStreams");
const { performance } = require("perf_hooks");
const vader = require("vader-sentiment");
const botToken = require("./discordBotToken.json");
const handleVoiceStreams = require("./functions/handleVoiceStreams");

const client = new Discord.Client({ fetchAllMembers: true });
const PREFIX = "&";
let currentChannelSize = 0;
let currentConnection = null;
let currentChannel = null;
let receivers = new Map();

const modelPath = "C:\\repos\\socialCredit\\js\\ttsModels\\model.tflite";
const scorerPath =
  "C:\\repos\\socialCredit\\js\\ttsModels\\huge-vocabulary.scorer";
//load stt model
const model = loadModel(modelPath, scorerPath);

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
  await joinVoiceChannel(botConnections);
  handleVoiceStreams(botConnections, model);
  // if (voiceState.channel != null) {
  //   if (botConnections.size == 0) {
  //     await voiceState.channel
  //       .join()
  //       .then(() => console.log("Joined Channel"))
  //       .catch(() => console.log("Did not join"));
  //   } else {
  //     if (
  //       voiceState.channel.members.size >=
  //       botConnections.first().channel.members.size
  //     ) {
  //       await voiceState.channel
  //         .join()
  //         .then(() => console.log("Joined Channel"))
  //         .catch(() => console.log("Did not join"));
  //     }
  //   }
  // }

  // if (botConnections.size != 0 && botConnections.first() != currentConnection) {
  //   currentConnection = botConnections.first();
  //   botConnections.first().on("speaking", async (user, speaking) => {
  //     if (speaking.bitfield == 0 || user.bot) {
  //       return;
  //     }
  //     // console.log(`I'm listening to ${user.username}`);
  //     const audioStream = botConnections.first().receiver.createStream(user, {
  //       mode: "pcm",
  //     });

  //     let buffer = [];
  //     audioStream.on("data", (data) => {
  //       buffer.push(data);
  //     });
  //     audioStream.on("end", async () => {
  //       buffer = Buffer.concat(buffer);
  //       const duration = buffer.length / 48000 / 4;
  //       if (duration < 1.0) {
  //         console.log("too short");
  //         return;
  //       }
  //       let wavBuffer = convertToWav(buffer);
  //       // console.log(wavBuffer);
  //       let transcription = transcribe(wavBuffer);
  //       // console.log(`${user.username} -- ${transcription}`);
  //       fs.appendFile(
  //         "./voiceText.txt",
  //         `${user.username} -- ${transcription}\n`,
  //         function (err) {
  //           if (err) throw err;
  //           console.log("Saved!");
  //         }
  //       );
  //       // newMessage(client, transcription, "", "", db, vader);
  //     });
  //   });
  //   botConnections.first().channel.members.forEach((member) => {
  //     if (member.user.bot) {
  //       return;
  //     }
  //   });
  // }
  if (
    botConnections.size != 0 &&
    botConnections.first().channel.members.size == 1
  ) {
    botConnections.first().channel.leave();
  }
});
client.login(botToken.token);
