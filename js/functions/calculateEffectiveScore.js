const multiplierWeight = require('../../constants/multiplierWeights.json');

module.exports = async function(rawScore, streak){
    return new Promise(function(resolve, reject){

        // take in streak and score, and calculate weighted score based off pre-determined weight values
        let calcScore;
        let newStreak;
        let adjustedWeight;
        if (streak <= 5 && streak >= -5){
            let streakWeight = multiplierWeight[Math.abs(streak)];
        
            if (streak <= 5 && streak > 0){
                if (rawScore > 0){ // +ve streak, +ve msg
                    calcScore = (rawScore * (1+(1-streakWeight)));
                    newStreak = ++streak;
                }
                else if (rawScore < 0){ // +ve streak, -ve msg
                    calcScore = (rawScore * streakWeight);
                    newStreak = 0;
                }
                else{ // +ve streak, neutral msg
                    calcScore = (rawScore * streakWeight);
                    newStreak = streak;
                }
            }
            else if (streak >= -5 && streak < 0){
                if (rawScore > 0){ // -ve streak, +ve msg

                    calcScore = (rawScore * streakWeight);
                    newStreak = 0;
                }
                else if (rawScore < 0){ // -ve streak, -ve msg
                    adjustedWeight = (1 + (1 - streakWeight));
                    calcScore = Math.pow(Math.abs(rawScore), adjustedWeight);
                    calcScore = calcScore * -1;
                    newStreak = --streak;
                }
                else{ // -ve streak, neutral msg
                    calcScore = (rawScore * streakWeight);
                    newStreak = streak;
                }
            }else{
                if(rawScore < 0){
                    calcScore = rawScore;
                    newStreak = --streak;
                }else{
                    calcScore = rawScore;
                    newStreak = ++streak;
                }
            }
        }
        else{

            if (streak > 5){
                if (rawScore > 0){
                    calcScore = Math.pow(rawScore, 1.25)
                    newStreak = ++streak;
                }
                else if (rawScore < 0){
                    calcScore = Math.pow(Math.abs(rawScore), 0.5)
                    calcScore = calcScore *-1;
                    newStreak = 0;
                }
                else{
                    calcScore = rawScore;
                    newStreak = streak;
                }
            }else if (streak < -5){
                if (rawScore > 0){
                    calcScore = Math.pow(rawScore, 0.5)
                    newStreak = 0;
                }
                else if (rawScore < 0){
                    calcScore = Math.pow(rawScore, 2);
                    calcScore = calcScore *-1;
                    newStreak = --streak;
                }
                else {
                    calcScore = rawScore;
                    newStreak = streak;
                }
            }
        }

        resolve([calcScore, newStreak]);
        if(calcScore == null || newStreak == null){
            reject('null values');
        }
    })
}