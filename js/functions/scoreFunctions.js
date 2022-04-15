const getUserFromMention = require('.../functions/getUserFromMention.js');
const multiplierWeight = require('.../multiplierWeights.json');

function scoreFromDB(client, message, args, db){
    let user = getUserFromMention.run(client, args[0]);
    let userID = user.id;
    let guildMember = message.guild.member(userID);
    let displayName = guildMember.displayName;

    let sql = `SELECT score FROM users WHERE userId = ${userID}`;
    scoreGet = db.query(sql, function(err, result, fields) {
        if(err){
            throw err
        }
        let score = result[0].score;
        return score; /*
        not sure if i need to have let score inside the function and return it...
        or if i can have it outside the db.query (sql, function()
        */
    });

    return scoreGet;
}

function scoreMultiplier(streak, rawScore){
    // take in streak and score, and calculate weighted score based off pre-determined weight values

    if (streak <= 5 && streak >= -5){
        streakWeight = multiplierWeight[Math.abs(streak)];
        if (streak <= 5 && streak >= 0){
            if (rawScore > 0){ // +ve streak, +ve msg
                calcScore = (rawScore * streakWeight);
                newStreak = streak++;
                //calcScore = (rawScore * (1- Math.abs(streakWeight)));
                // increased +ve growth ^^
            }
            else if (rawScore < 0){ // +ve streak, -ve msg
                calcScore = (rawScore * streakWeight);
                newStreak = 0;
                //calcScore = (rawScore * (1- Math.abs(streakWeight)));
                //cancel culture feature ^^
            }
            else{ // +ve streak, neutral msg
                calcScore = (rawScore * streakWeight);
            }
        }
        else if (streak >= -5 && streak <= 0){
            if (rawScore > 0){ // -ve streak, +ve msg
                calcScore = (rawScore * streakWeight);
                newStreak = 0;
            }
            else if (rawScore < 0){ // -ve streak, -ve msg
                adjustedWeight = (1 + Math.abs(1 - streakWeight));
                calcScore = Math.pow(rawScore, adjustedWeight);
                newStreak = streak--;
            }
            else{ // -ve streak, neutral msg
                calcScore = (rawScore * streakWeight);
            }
        }
    }
    else{
        if (streak > 5){
            if (rawScore > 0){
                calcScore = Math.pow(rawScore, 1.25)
                newStreak = streak++;
            }
            else if (rawScore < 0){
                calcScore = Math.pow(rawScore, 0.5)
                newStreak = 0;
            }
            else{
                calcScore = rawScore;
            }
        }else if (streak < -5){
            if (rawScore > 0){
                calcScore = Math.pow(rawScore, 0.5)
                newStreak = 0;
            }
            else if (rawScore < 0){
                calcScore = Math.pow(rawScore, 2);
                newStreak = streak--;
            }
            else {
                calcScore = rawScore;
            }
        }
    }
    return calcScore, newStreak;
}