const dbQuery = require("./dbQuery.js");
const calculateEffectiveScore = require("./calculateEffectiveScore.js");

//handle a single newMessage by running sentiment analysis and updating user and message tables
//with approprite data
module.exports = async function (client, message, cmd, args, db, vader) {
  let userId = message.author.id;
  let messageId = message.id;
  let channelId = message.channel.id;
  let name = message.author.username.replaceAll("'", "").replaceAll("`", "");

  //insert new user or ignore if user exists
  let insertSql = `INSERT IGNORE INTO users (userId, name, score, messageStreak, rank) VALUES (?,?, '0', '0', '0')`;
  await dbQuery(db, insertSql, [userId, name])
    .then(() => {})
    .catch((err) => {
      console.log(`${err} -selectUserId ${userId}`);
      throw err;
    });

  //fetch user data
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

  //run VADER sentiment analysis
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

  //update db
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
