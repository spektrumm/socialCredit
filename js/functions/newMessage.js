const fs = require('fs');
const checkForFileExistence = require('./checkForFileExistence.js');
const dbQuery = require('./dbQuery.js');
const calculateEffectiveScore = require('./calculateEffectiveScore.js');

module.exports = async function (client, message, db){
//async function newMessage(client, message, db){

    let messageId = message.id;
    let fileSend = `D:\\repos\\socialCredit\\msgIO\\toPy\\${messageId}-py.json`;
    let fileReceive = `D:\\repos\\socialCredit\\msgIO\\toJs\\${messageId}-js.json`;


    //sendfile
    messageJson = JSON.stringify(message);

    fs.writeFile(fileSend, messageJson, err => {
        if(err){
            console.log(`${err} - ${messageId}`)
            return;
        }
    });

    //receive file
    await checkForFileExistence(fileReceive, 5000, fs).then(result => {
        console.log(result);
    })
        // const returnFile = require(fileReceive);
        // let returnObject = JSON.parse(returnFile);
        // let userSql = `SELECT * FROM users WHERE userId = ${userId}`
        // let currentScore;
        // let messageStreak;
        // let rank;

        // try{
        //     let userScore = await dbQuery(db, userSql).then(userData =>{
        //         currentScore = userData[0].score;
        //         messageStreak = userData[0].messageStreak;
        //         rank = userData[0].rank;
        //     }
        //     )

        // }catch (err){
        //     throw err
        // }
        
        // let messageId = message.id;
        // let userId = message.author.id;
        // let content = message.cleanContent;
        // let timestamp = message.createdTimestamp;
        // let rawScoreChange = returnObject.score;
        // let newScoreAndStreak = calculateEffectiveScore(rawScoreChange, messageStreak);
        // let effectiveScoreChange =newScoreAndStreak[0];
        // let newMessageStreak = newScoreAndStreak[1];
        // let newScore = currentScore + effectiveScoreChange;

        // //check for rank change
        // // if(rankChange(currentScore, effectiveScoreChange)){
        // //     console.log('rankChange');
        // //     //rank = newRank;
            
        // // }

        // let updateScoreSql = `UPDATE users SET score = ${newScore}, rank = ${rank}, messageStreak = ${newMessageStreak} WHERE userId = ${userId}`;
        // let addMessageSql = `INSERT INTO messages (messageId, userId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES 
        //                      (${messageId}, ${userId}, ${content}, ${rawScoreChange}, ${effectiveScoreChange}, ${newScore}, ${timestamp})`;
 
        // try{
        //     await dbQuery(db, updateScoreSql);
        //     await dbQuery(db, addMessageSql);

        // }catch(err){
        //     throw err;
        // }

    // }).catch(err =>{
    //     console.log(`${err} - ${messageId}`)
    // })

}