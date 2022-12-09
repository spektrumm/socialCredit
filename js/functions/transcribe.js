const fs = require("fs");
// const { setTimer, getTimer } = require("chronos");
const STT = require("stt");

function loadModel(modelPath, scorerPath) {
  let model;

  try {
    model = new STT.Model(modelPath);
  } catch (error) {
    throw `model.stt: ${error}`;
  }

  try {
    model.enableExternalScorer(scorerPath);
  } catch (error) {
    throw `model.enableExternalScorer: ${error}`;
  }

  return model;
}

function transcriptBuffer(audioBuffer, model) {
  // WARNING:
  // no audioBuffer validation is done.
  // The audio fle must be a WAV audio in raw format.

  try {
    return model.stt(audioBuffer);
  } catch (error) {
    throw `model.stt error: ${error}`;
  }
}

function freeModel(model) {
  try {
    STT.FreeModel(model);
  } catch (error) {
    throw `STT.FreeModel error: ${error}`;
  }
}

module.exports = (file) => {
  const modelPath = "C:\\repos\\socialCredit\\js\\ttsModels\\model.tflite";
  const scorerPath =
    "C:\\repos\\socialCredit\\js\\ttsModels\\huge-vocabulary.scorer";
  let result;

  //   const loadModelTime = setTimer();

  //
  // load Coqui STT model
  //

  const model = loadModel(modelPath, scorerPath);
  let audioBuffer = fs.readFileSync(file);

  //   if (DEBUG_WORKER) console.log(`worker: load model elapsed:`);

  //
  // transcript the audio buffer
  //
  try {
    result = transcriptBuffer(audioBuffer, model);

    // if (DEBUG_WORKER) console.log(`worker: transcriptBuffer elapsed:`);
  } catch (error) {
    throw `transcriptBuffer: ${error}`;
  }

  //
  // free the model
  //

  freeModel(model);

  return result;
};

// function main() {
//   const modelPath = "C:\\repos\\socialCredit\\js\\ttsModels\\model.tflite";
//   const scorerPath =
//     "C:\\repos\\socialCredit\\js\\ttsModels\\huge-vocabulary.scorer";
//   const sourceFile =
//     "C:\\repos\\socialCredit\\js\\230449859809902592-pelase.wav";

//   //   const modelPath = "./../ttsModels/coqui-stt-0.9.3-models.pbmm";
//   //   const scorerPath = "./../ttsModels/coqui-stt-0.9.3-models.scorer";
//   //   const sourceFile = "./230449859809902592-audio.wav";

//   //
//   // load an audio file into a Buffer
//   //
//   const audioBuffer = fs.readFileSync(sourceFile, { flag: "rs+" });

//   const result = transcriptNoThread(modelPath, scorerPath, audioBuffer);

//   console.log(`transcript: ${result}`);
// }

// if (require.main === module) main();

// module.exports = { transcriptNoThread };
