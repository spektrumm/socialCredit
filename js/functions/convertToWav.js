const wavConverter = require("wav-converter");
var fs = require("fs");
const { WaveFile } = require("wavefile");
const wavefile = require("wavefile").WaveFile();

module.exports = (fileName) => {
  let file = `C:\\repos\\socialCredit\\js\\${fileName}`;

  // var pcmData = fs.readFileSync(`${memberId}-audio.pcm`);
  var pcmData = fs.readFileSync(`${file}.pcm`);

  // read stereo audio file into signed 16 array
  const data = new Int16Array(pcmData);
  // create new array for the mono audio data
  const newData = new Int16Array(data.length / 2);
  // copy left audio data (skip the right part)
  for (let i = 0, j = 0; i < data.length; i += 4) {
    newData[j++] = data[i];
    newData[j++] = data[i + 1];
  }
  // save the mono audio file
  let monoPcmData = Buffer.from(newData);
  var wavData = wavConverter.encodeWav(monoPcmData, {
    numChannels: 1,
    sampleRate: 48000,
    byteRate: 16,
  });
  let wav = new WaveFile(wavData);
  wav.toSampleRate(16000);
  fs.writeFileSync(`${file}.wav`, wav.toBuffer());
};
// function main() {
//   const result = convertToWav("test");
// }

// if (require.main === module) main();

// module.exports = { convertToWav };
