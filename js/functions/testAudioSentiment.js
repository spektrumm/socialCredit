const vader = require("vader-sentiment");
const fs = require("fs");
const readline = require("readline");

const file = fs.readFileSync("./../voiceText.txt");

file
  .toString()
  .split(/\n/)
  .forEach((line) => {
    console.log(
      line,
      " ---- ",
      vader.SentimentIntensityAnalyzer.polarity_scores(line).compound * 100
    );
  });
