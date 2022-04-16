const fs = require('fs');
const checkForFileExistence = require('./checkForFileExistence.js');
const dbQuery = require('./dbQuery.js');
const calculateEffectiveScore = require('./calculateEffectiveScore.js');

module.exports = async function (client, message, db){
//async function newMessage(client, message, db){

    let messageId = message.id;
    let fileSend = `D:\\repos\\socialCredit\\messageIO\\message-in\\${messageId}-out.json`;
    let fileReceive = `D:\\repos\\socialCredit\\messageIO\\message-out\\${messageId}-in.json`;


    //sendfile
    messageJson = JSON.stringify(message);

    fs.writeFile('D:\\repos\\socialCredit\\messageIO\\message-in\\${messageId}-out.json', messageJson, err => {
        if(err){
            console.log(`${err} - ${messageId}`)
            return;
        }
    });

    //recieve file
    await checkForFileExistence(fileReceive, 5000, fs).then(result => {
        const returnFile = require(fileReceive);
        let returnObject = JSON.parse(returnFile);
        let userSql = `SELECT * FROM users WHERE userId = ${userId}`
        let currentScore;
        let messageStreak;
        let rank;

        try{
            let userScore = await dbQuery(db, userSql).then(userData =>{
                currentScore = userData[0].score;
                messageStreak = userData[0].messageStreak;
                rank = userData[0].rank;
            }
            )

        }catch (err){
            throw err
        }
        
        let messageId = message.id;
        let userId = message.author.id;
        let content = message.cleanContent;
        let timestamp = message.createdTimestamp;
        let rawScoreChange = returnObject.score;
        let effectiveScoreChange = calculateEffectiveScore(rawScoreChange, messageStreak);
        let newScore = currentScore + effectiveScoreChange;

        //update message streak
        if(rawScoreChange >= 0){//good message -> score increases
            messageStreak++;
        }else if(rawScoreChange < 0 && messageStreak < 0){//bad message with negative score -> score gets worse
            messageStreak--;
        }else{//bad message with good score -> score goes to zero
            messageStreak = 0;
        }

        //check for rank change
        if(rankChange(currentScore, effectiveScoreChange)){
            console.log('rankChange');
            //rank = newRank;
            
        }

        let updateScoreSql = `UPDATE users SET score = ${newScore}, rank = ${rank}, messageStreak = ${messageStreak} WHERE userId = ${userId}`;
        let addMessageSql = `INSERT INTO messages (messageId, userId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES 
                             (${messageId}, ${userId}, ${content}, ${rawScoreChange}, ${effectiveScoreChange}, ${newScore}, ${timestamp})`;
 
        try{
            await dbQuery(db, updateScoreSql);
            await dbQuery(db, addMessageSql);

        }catch(err){
            throw err;
        }

    }).catch(err =>{
        console.log(`${err} - ${messageId}`)
    })

}