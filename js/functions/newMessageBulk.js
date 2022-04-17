// const fs = require('fs');
// const checkForFileExistence = require('./checkForFileExistence.js');
// const dbQuery = require('./dbQuery.js');
// const calculateEffectiveScore = require('./calculateEffectiveScore.js');


// module.exports = async function (client, file, db){

//     file.forEach(message =>{
//        await addMessage(client, message, db);
//     })
// }



// async function addMessage (client, message, db){
// //async function newMessage(client, message, db){

//     let messageId;
//     let channelId;
//     let content;
//     let timestamp;
//     let rawScoreChange;
//     let userId;


//     messageId = message.messageID;
//     channelId = message.channelID;
//     content = message.content;
//     timestamp = message.timestamp;
//     rawScoreChange = parseInt(message.rawScoreChange);
//     userId = message.authorID;

//     await checkForUser(userId, db).then(user =>{
//         console.log(user);
//     }).catch(err =>{
//         console.log(`${err} - ${messageId}`)
//         return;
//     })

//     let userSql = `SELECT * FROM users WHERE userId = ${userId}`
//     let currentScore;
//     let messageStreak;
//     let rank;

//     await dbQuery(db, userSql).then(userData =>{
//         //console.log(userData);
//         currentScore = userData[0].score;
//         messageStreak = userData[0].messageStreak;
//         rank = userData[0].rank;
//         //console.log(userData[0].userId);
//     }).catch(err =>{
//         console.log(`${err} - ${messageId}`)
//         return;
//     })
    
    
//     //console.log(rawScoreChange, messageStreak);
//     let newScoreAndStreak = calculateEffectiveScore(rawScoreChange, messageStreak);
    
//     //console.log(newScoreAndStreak);
//     let effectiveScoreChange =parseInt(newScoreAndStreak[0]);
//     let newMessageStreak = newScoreAndStreak[1];
//     let newScore = parseInt(currentScore + effectiveScoreChange);
    
//     console.log('score -- ', effectiveScoreChange, 'streak == ', newMessageStreak, 'rank -- ', rank, 'new score  -- ', newScore);
    
//     //check for rank change
//     // if(rankChange(currentScore, effectiveScoreChange)){
//         //     console.log('rankChange');
//         //     //rank = newRank;
        
//         // }
        
//         let updateScoreSql = `UPDATE users SET score = ${newScore}, rank = ${rank}, messageStreak = ${newMessageStreak} WHERE userId = ${userId}`;
//         let addMessageSql = `INSERT INTO messages (messageId, userId, channelId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES 
//         ('${messageId}','${userId}', '${channelId}', '${content}', '${rawScoreChange}', '${effectiveScoreChange}', '${newScore}', '${timestamp}')`;
        
//         try{
//             await dbQuery(db, updateScoreSql);
//             await dbQuery(db, addMessageSql);
            
//         }catch(err){
//             throw err;
//         }
        

// }

// async function addNewUser(userId, db){
//         const guild = await client.guilds.fetch(args);
//         let user = await guild.members.cache.get(userId);

//         let post = [];
//         let name = user.name;
//         let score = user.score;

//         let sql = `INSERT INTO users (userId, name, score, multiplier, messageStreak, rank) VALUES ('${userId}','${name}', '${score}', '0', '0')`;

//         dbQuery(db, sql).catch(err =>{
//             console.log(`${err} - ${messageId}`)
//             return;
//         })
// }

// async function checkForUser(userId, db){
//     let sql = `SELECT userId FROM users WHERE EXISTS (SELECT userId FROM users WHERE userId = ${userId})`;
//     let query = dbQuery(db,sql).catch(err =>{
//         console.log(`${err} - ${messageId}`)
//         return;
//     })
//     if(!query){
//         addNewUser(userId, db);
//     }

// }