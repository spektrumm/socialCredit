const fs = require("fs");

module.exports = async function (
  connection,
  currentChannel,
  currentConnections
) {
  console.log("handleAudioConnections");
  if (connection !== null) {
    currentChannel.members.forEach((member) => {
      if (member.bot === false) {
        let contains = false;
        currentConnections.forEach((connection) => {
          if ((connection.userId = member.user.id)) {
            contains = true;
          }
        });
        if (contains === false) {
          const receiver = connection.receiver.createStream(member, {
            mode: "pcm",
            end: "manual",
          });
          currentConnections.push({
            userId: member.user.id,
            receiver: receiver,
          });
        }
      }
    });
    currentConnections.forEach((connection, index) => {
      console.log(connection.userId);
      let inChannel = false;
      currentChannel.members.forEach((member) => {
        if (member.user.id === connection.userId) {
          inChannel = true;
        }
      });
      console.log(inChannel, "inChannel");
      if (inChannel === false) {
        connection.receiver.end();
        connection.receiver.pipe(
          fs.createWriteStream(`${connection.userId}-audio.pcm`)
        );
        currentConnections.splice(index);
      }
    });
  }
  //   console.log(currentConnections);
  return currentConnections;
};
