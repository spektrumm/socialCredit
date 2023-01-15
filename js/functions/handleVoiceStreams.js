const Discord = require("discord.js");
const fs = require("fs");

module.exports = (botConnections, model) => {
  //if no connections or same connection do nothing
  if (botConnections.size == 0 && botConnections.first() == currentConnection) {
    return;
  }

  currentConnection = botConnections.first();
  botConnections.first().on("speaking", async (user, speaking) => {
    if (speaking.bitfield == 0 || user.bot) {
      return;
    }
    const audioStream = botConnections.first().receiver.createStream(user, {
      mode: "pcm",
    });

    let buffer = [];
    audioStream.on("data", (data) => {
      buffer.push(data);
    });
    audioStream.on("end", async () => {
      buffer = Buffer.concat(buffer);
      const duration = buffer.length / 48000 / 4;
      if (duration < 1.0) {
        console.log("too short");
        return;
      }
      let wavBuffer = convertToWav(buffer);
      let transcription = transcribe(wavBuffer, model);
      let channel = botConnections.first().channel;
      newVoiceMessage(transcription, user, channel, db, vader);
    });
  });
};
