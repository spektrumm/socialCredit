const Discord = require("discord.js");
const fs = require('fs');
const jsonData = require('D:\\repos\\socialCredit\\legacyFiles\\legacyScores2.json');


module.exports.run = async (client, message, cmd, args, db) => {    
    console.log(jsonData);
};

module.exports.help = {
    name: 'legacyScoreReformat',
    aliases: ['legScrRef']
};