const { performance } = require("perf_hooks");
const newMessageBulk = require("../functions/newMessageBulk");
const dbQuery = require("../functions/dbQuery.js");

//retuns all messages for a specific channelId
const getAllChannelMessages = async (client, guild, channel, db, vader) => {
  const messages = [];
  let message = await channel.messages
    .fetch({ limit: 1 })
    .then((messageFetch) =>
      messageFetch.size === 1 ? messageFetch.first() : null
    );
  if (message !== null) {
    messages.push(message);
  }

  while (message) {
    await channel.messages
      .fetch({ limit: 100, before: message.id })
      .then((messageFetch) => {
        messageFetch.forEach((msg) => {
          if (!msg.author.bot) {
            //let startTime = performance.now();
            if (msg !== null) {
              messages.push(msg);
            }
            //let endTime = performance.now();
            //console.log(endTime-startTime);
          }
        });
        //updating pointer
        message = 0 < messageFetch.size ? messageFetch.last() : null;
      });
  }
  return messages;
};

//calls getAllChannelMessages for all channels in guildId
const getAllMessages = async (client, message, cmd, args, db, vader) => {
  let messages = [];
  let guildId = args;
  const guild = await client.guilds.fetch(guildId);
  await Promise.all(
    guild.channels.cache.map(async (channel) => {
      if (channel.type === "text") {
        if (channel.name !== "botspam") {
          console.log("fetching - " + channel.name);
          await getAllChannelMessages(
            client,
            guild,
            channel,
            db,
            vader
          ).then((msg) => {
            messages = message.concat(msg)
            // messages.push(msg);
          });
        }
      }
    })
  );
  // let concatted = [];
  // messages.forEach((channel) => {
  //   concatted = concatted.concat(channel);
  // });
  // concatted.sort(GetSortOrder("createdTimestamp"));
  // return concatted;
  //sort messages based on timestamp
  messages.sort(getSortOrder("createdTimestamp"));
  return messages;
};

//run sentiment analysis on getAllMessages and calculate weighted scores,
//add all data to db
module.exports.run = async (client, message, cmd, args, db, vader) => {
  let startTime = performance.now();
  let users = [];
  let messages = [];
  await getAllMessages(client, message, cmd, args, db, vader).then((msg) => {
    msg.forEach((message) => {
      let result = newMessageBulk(client, message, db, vader, users);
      messages.push(result.messageObj);
      users = result.users;
    });
  });
  await Promise.all(
    users.map(async (user) => {
      let sql = `INSERT IGNORE INTO users (userId, name, score, messageStreak, rank) VALUES (?,?, ?, ?, ?)`;
      await dbQuery(db, sql, [
        user.userId,
        user.name,
        user.score,
        user.messageStreak,
        user.rank,
      ]).catch((err) => {
        console.log(`${err} -selectUserId ${user.userId}`);
        throw err;
      });
    })
  );

  await Promise.all(
    messages.map(async (msg) => {
      let post = [
        msg.messageId,
        msg.userId,
        msg.channelId,
        msg.content,
        msg.rawScoreChange,
        msg.effectiveScoreChange,
        msg.score,
        msg.timestamp,
      ];
      let sql = `INSERT INTO messages (messageId, userId, channelId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES (?)`;
      await dbQuery(db, sql, [post]).catch((err) => {
        console.log(`${err} -selectUserId ${msg.userId}`);
        throw err;
      });
    })
  );
  let endTime = performance.now();
  console.log((endTime - startTime) / 1000);
};

//Comparer Function for sorting
const getSortOrder = (prop) => {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
};

module.exports.help = {
  name: "getAllMessages",
  aliases: ["getAllMsgs"],
};
