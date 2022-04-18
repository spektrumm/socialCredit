const fs = require('fs');
const checkForFileExistence = require('./checkForFileExistence.js');
const dbQuery = require('./dbQuery.js');
const calculateEffectiveScore = require('./calculateEffectiveScore.js');

module.exports = async function (client, message, db){
    //async function newMessage(client, message, db){
        
    let userId = message.author.id;
    let messageId = message.id;
    let channelId = message.channel.id;
    let name = message.author.username.replaceAll("'", "").replaceAll("`", "");
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
    await checkForFileExistence(fileReceive, 10000000, fs).then(result => {
        fileExists = result;
    }).catch(err =>{
        fileExists = err;
    })
    let sentimentAnalysisObj;

    if(fileExists === false){
        console.log('File did not exists and was not created during the timeout.');
        throw("exit");
    }else{
        sentimentAnalysisObj = require(fileReceive);
        fs.unlink(fileReceive, function (err) {
            if (err) {
              console.error(err);
            } else {
              //console.log("File removed:", fileReceive);
            }
          });

    }
    //check if user exists
    //let userExists;
    let insertSql = `INSERT IGNORE INTO users (userId, name, score, messageStreak, rank) VALUES (?,?, '0', '0', '0')`;
    //console.log(checkSql);
    await dbQuery(db, insertSql, [userId, name]).then(user =>{
       // console.log(user);
        // if(user.length === 0){
        //     userExists = false;
        // }else{
        //     userExists = true;
        // }
    }).catch(err =>{
        console.log(`${err} -selectUserId ${userId}`)
        throw(err);
    })
    // console.log('userExists -- ',userExists);
    // if(!userExists){
    //     let insertSql = `INSERT INTO users (userId, name, score, messageStreak, rank) VALUES ('${userId}','${name}', '0', '0', '0')`;
    //     await dbQuery(db, insertSql).catch(err =>{
    //         console.log(`${err} - inserting user ${userId}`)
    //         throw(err);
    //     })
    // }
    let userSql = `SELECT * FROM users WHERE userId = ?`
    let currentScore;
    let messageStreak;
    let rank;

    await dbQuery(db, userSql, [userId]).then(userData =>{
        //console.log(userData);
        currentScore = userData[0].score;
        messageStreak = userData[0].messageStreak;
        rank = userData[0].rank;
        //console.log(userData);
    }).catch(err =>{
       // console.log('test3');
        console.log(`${err} - ${messageId}`)
        return;
    })
//console.log(messageStreak, ' -- ', currentScore, '--' , rank);

    //console.log('test');
    
    let content = message.cleanContent.replaceAll("\n", "").replaceAll('"', "'").replaceAll("`", "'");
    //console.log(content);
    let timestamp = message.createdTimestamp;
    //console.log(sentimentAnalysisObj);
    let rawScoreChange = parseInt(sentimentAnalysisObj.score);
    //console.log('rawScoreChange -- ', rawScoreChange);

    let effectiveScoreChange;
    let newMessageStreak;
    //console.log(rawScoreChange, messageStreak);
    await calculateEffectiveScore(rawScoreChange, messageStreak).then(data =>{
        
        effectiveScoreChange = parseInt(data[0]);
        newMessageStreak = parseInt(data[1]);
    })
    //console.log('effectiveScoreChange', effectiveScoreChange,'newMessageStreak', newMessageStreak);

    
    //console.log(newScoreAndStreak);
    let newScore = parseInt(currentScore + effectiveScoreChange);
    
    //console.log('score -- ', effectiveScoreChange, 'streak == ', newMessageStreak, 'rank -- ', rank, 'new score  -- ', newScore);
    
    // //check for rank change
    // if(rankChange(currentScore, effectiveScoreChange)){
    //         console.log('rankChange');
    //         //rank = newRank;
        
    //     }

    //console.log(`${newScore}, rank = ${rank}, messageStreak = ${newMessageStreak}`);

    
    let updateScoreSql = `UPDATE users SET score = ?, rank = ?, messageStreak = ? WHERE userId = ?`;
    let addMessageSql = `INSERT IGNORE INTO messages (messageId, userId, channelId, content, rawScoreChange, effectiveScoreChange, score, timestamp) VALUES
    (?,?, ?, ?, ?, ?, ?, ?)`;
    
    try{
    let updateScoreSql = `UPDATE users SET score = ${newScore}, rank = ${rank}, messageStreak = ${newMessageStreak} WHERE userId = ${userId}`;
        dbQuery(db, updateScoreSql, [newScore, rank, newMessageStreak, userId]);
        dbQuery(db, addMessageSql, [messageId, userId, channelId, content, rawScoreChange, effectiveScoreChange, newScore, timestamp]);
        
    }catch(err){
        throw err;
    }
        

}


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