var wavConverter = require("wav-converter");
var fs = require("fs");
var path = require("path");

module.exports = function (memberId) {
  var pcmData = fs.readFileSync(`${memberId}-audio.pcm`);
  var wavData = wavConverter.encodeWav(pcmData, {
    numChannels: 2,
    sampleRate: 48000,
    byteRate: 16,
  });
  console.log("test");
  fs.writeFileSync(`${memberId}-audio.pcm`, wavData);
};
