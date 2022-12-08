const fs = require("fs");
const DeepSpeech = require("deepspeech");

// // Path to the DeepSpeech model and alphabet files
// const MODEL_FILE = "./models/output_graph.pbmm";
// const ALPHABET_FILE = "./models/alphabet.txt";

// // Load the DeepSpeech model and alphabet
// const model = new DeepSpeech.Model(MODEL_FILE);
// const alphabet = fs.readFileSync(ALPHABET_FILE, "utf-8");

// // Load the PCM audio file and convert it to the correct format
// const audioBuffer = fs.readFileSync("./230449859809902592-audio");
// const audioLength = audioBuffer.length / 2;
// const audioData = new Int16Array(audioLength);

// for (let i = 0; i < audioLength; i++) {
//   audioData[i] = audioBuffer.readInt16LE(i * 2);
// }

// // Run the transcription
// const transcription = model.stt(audioData, 16000, alphabet);
// console.log(transcription);
