const fs = require("fs");
const Discord = require("discord.js");

module.exports = async function (voiceState, currentChannelSize, client) {
  if (voiceState.channel !== null) {
    let channel = voiceState.channel;
    console.log(
      "currentChannelSize",
      "channel.members.size",
      currentChannelSize,
      channel.members.size
    );
    if (channel.members.size >= currentChannelSize) {
      //only changes channels if new channel has more people than old channel
      connection = await channel.join();
      //channel.join();
      return connection;
    }
  }
  return false;
};
