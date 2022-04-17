const fs = require('fs');
const checkForFileExistence = require('./checkForFileExistence.js');
const dbQuery = require('./dbQuery.js');
const calculateEffectiveScore = require('./calculateEffectiveScore.js');

module.exports = async function (client, message, db){
//async function newMessage(client, message, db){

    let messageId = message.id;
    let channelId = message.channel.id;
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
    let fileExists;
    //receive file
    await checkForFileExistence(fileReceive, 5000, fs).then(result => {
        fileExists = result;
    }).catch(err =>{
        console.log(`${err} - ${messageId}`)
    })


    if(fileExists == false){
        console.log('File did not exists and was not created during the timeout.');
        return;
    }
    
    const sentimentAnalysisObj = require(fileReceive);
    let userId = message.author.id;
    //console.log('user id -- ', userId)
    let userSql = `SELECT * FROM users WHERE userId = ${userId}`
    let currentScore;
    let messageStreak;
    let rank;

    await dbQuery(db, userSql).then(userData =>{
        //console.log(userData);
        currentScore = userData[0].score;
        messageStreak = userData[0].messageStreak;
        rank = userData[0].rank;
        //console.log(userData[0].userId);
    }).catch(err =>{
        console.log(`${err} - ${messageId}`)
        return;
    })
    
    let content = message.cleanContent;
    let timestamp = message.createdTimestamp;
    let rawScoreChange = parseInt(sentimentAnalysisObj.score);
    //console.log(rawScoreChange, messageStreak);
    let newScoreAndStreak = calculateEffectiveScore(rawScoreChange, messageStreak);
    
    //console.log(newScoreAndStreak);
    let effectiveScoreChange =parseInt(newScoreAndStreak[0]);
    let newMessageStreak = newScoreAndStreak[1];
    let newScore = parseInt(currentScore + effectiveScoreChange);
    
    //console.log('score -- ', effectiveScoreChange, 'streak == ', newMessageStreak, 'rank -- ', rank, 'new score  -- ', newScore);
    
    //check for rank change
    // if(rankChange(currentScore, effectiveScoreChange)){
        //     console.log('rankChange');
        //     //rank = newRank;
        
        // }
        
        let updateScoreSql = `UPDATE users SET score = ${newScore}, rank = ${rank}, messageStreak = ${newMessageStreak} WHERE userId = ${userId}`;
        let addMessageSql = `INSERT INTO messages (messageId, userId, channelId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES 
        ('${messageId}','${userId}', '${channelId}', '${content}', '${rawScoreChange}', '${effectiveScoreChange}', '${newScore}', '${timestamp}')`;
        
        try{
            await dbQuery(db, updateScoreSql);
            await dbQuery(db, addMessageSql);
            
        }catch(err){
            throw err;
        }
        

}