const dbQuery = require("./dbQuery.js");
const calculateEffectiveScore = require("./calculateEffectiveScore.js");

module.exports = async function (client, message, db, vader) {
  let userId = message.author.id;
  let messageId = message.id;
  let channelId = message.channel.id;
  let name = message.author.username.replaceAll("'", "").replaceAll("`", "");

  let insertSql = `INSERT IGNORE INTO users (userId, name, score, messageStreak, rank) VALUES (?,?, '0', '0', '0')`;
  await dbQuery(db, insertSql, [userId, name])
    .then(() => {})
    .catch((err) => {
      console.log(`${err} -selectUserId ${userId}`);
      throw err;
    });
  let userSql = `SELECT * FROM users WHERE userId = ?`;
  let currentScore;
  let messageStreak;
  let rank;

  await dbQuery(db, userSql, [userId])
    .then((userData) => {
      currentScore = userData[0].score;
      messageStreak = userData[0].messageStreak;
      rank = userData[0].rank;
    })
    .catch((err) => {
      console.log(`${err} - ${messageId}`);
      return;
    });

  let content = message.cleanContent
    .replaceAll("\n", "")
    .replaceAll('"', "'")
    .replaceAll("`", "'");
  let timestamp = message.createdTimestamp;

  let rawScoreChange =
    vader.SentimentIntensityAnalyzer.polarity_scores(content).compound * 100;

  let effectiveScoreChange;
  let newMessageStreak;
  await calculateEffectiveScore(rawScoreChange, messageStreak).then((data) => {
    effectiveScoreChange = parseInt(data[0]);
    newMessageStreak = parseInt(data[1]);
  });

  let newScore = parseInt(currentScore + effectiveScoreChange);

  // //check for rank change
  // if(rankChange(currentScore, effectiveScoreChange)){
  //         console.log('rankChange');
  //         //rank = newRank;

  //     }

  let updateScoreSql = `UPDATE users SET score = ?, rank = ?, messageStreak = ? WHERE userId = ?`;
  let addMessageSql = `INSERT IGNORE INTO messages (messageId, userId, channelId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES
    (?,?, ?, ?, ?, ?, ?, ?)`;

  try {
    dbQuery(db, updateScoreSql, [newScore, rank, newMessageStreak, userId]);
    dbQuery(db, addMessageSql, [
      messageId,
      userId,
      channelId,
      content,
      rawScoreChange,
      effectiveScoreChange,
      newScore,
      timestamp,
    ]);
  } catch (err) {
    throw err;
  }
};
