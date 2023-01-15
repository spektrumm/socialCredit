module.exports = async (botConnections) => {
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
};
