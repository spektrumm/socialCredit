const multiplierWeight = require('../../constants/multiplierWeights.json');

module.exports = function(streak, rawScore){
    // take in streak and score, and calculate weighted score based off pre-determined weight values
    let calcScore;
    let newStreak;
    let adjustedWeight;
    if (streak <= 5 && streak >= -5){
        let streakWeight = multiplierWeight[Math.abs(streak)];
    
        if (streak <= 5 && streak >= 0){
            if (rawScore > 0){ // +ve streak, +ve msg
                calcScore = (rawScore * streakWeight);
                newStreak = streak++;
            }
            else if (rawScore < 0){ // +ve streak, -ve msg
                calcScore = (rawScore * streakWeight);
                newStreak = 0;
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
                adjustedWeight = (1 + (1 - streakWeight));
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
    return [calcScore, newStreak];
}