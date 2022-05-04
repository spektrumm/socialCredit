const dbQuery = require("./dbQuery.js");
const calculateEffectiveScore = require("./calculateEffectiveScore.js");
module.exports = (client, message, db, vader, users) => {
  let userId = message.author.id;
  let messageId = message.id;
  let channelId = message.channel.id;
  let name = message.author.username.replaceAll("'", "").replaceAll("`", "");
  let userIndex;
  let userExists = false;
  let currentScore;
  let messageStreak;
  let rank;
  users.forEach((user, index) => {
    if (user.userId === userId) {
      userIndex = index;
      userExists = true;
      currentScore = user.score;
      messageStreak = user.messageStreak;
      rank = user.rank;
    }
  });
  if (userExists === false) {
    currentScore = 0;
    messageStreak = 0;
    rank = 0;
    // users.push({
    //   id: userId,
    //   name: name,
    //   score: 0,
    //   messageStreak: 0,
    //   rank: 0,
    // });
  }

  let content = message.cleanContent
    .replaceAll("\n", "")
    .replaceAll('"', "'")
    .replaceAll("`", "'");
  let timestamp = message.createdTimestamp;

  let rawScoreChange =
    vader.SentimentIntensityAnalyzer.polarity_scores(content).compound * 100;

  let effectiveScoreChange;
  let newMessageStreak;
  let effectiveScore = calculateEffectiveScore(rawScoreChange, messageStreak);
  effectiveScoreChange = parseInt(effectiveScore[0]);
  newMessageStreak = parseInt(effectiveScore[1]);
  let newScore = parseInt(currentScore + effectiveScoreChange);

  // //check for rank change
  // if(rankChange(currentScore, effectiveScoreChange)){
  //         console.log('rankChange');
  //         //rank = newRank;

  //     }

  if (userExists === true) {
    users[userIndex] = {
      userId: userId,
      name: name,
      score: newScore,
      messageStreak: newMessageStreak,
      rank: rank,
    };
  } else {
    users.push({
      userId: userId,
      name: name,
      score: newScore,
      messageStreak: newMessageStreak,
      rank: rank,
    });
  }
  const messageObj = {
    messageId: messageId,
    userId: userId,
    channelId: channelId,
    content: content,
    rawScoreChange: rawScoreChange,
    effectiveScoreChange: effectiveScoreChange,
    score: newScore,
    timestamp: timestamp,
  };
  return { messageObj, users };
};
