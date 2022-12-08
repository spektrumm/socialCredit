const joinVoice = require("./joinVoiceChannel");

module.exports = async function (currentChannel, voiceState, client) {
  // if bot is not in a channel
  console.log("currentChan", currentChannel);
  if (currentChannel === null) {
    console.log("testing");
    await joinVoice(voiceState, 0, client).then((newChannel) => {
      if (newChannel !== false) {
        return newChannel;
      }
    });
  } else {
    let currentChannelSize = currentChannel.members.size;
    await joinVoice(voiceState, currentChannelSize, client).then(
      (newChannel) => {
        if (newChannel !== false) {
          return newChannel;
        }
      }
    );
  }
  if (currentChannel !== null && currentChannel.members.size <= 1) {
    console.log("leaving", currentChannel.id);
    currentChannel.leave();
    currentChannel = null;
  }
};
