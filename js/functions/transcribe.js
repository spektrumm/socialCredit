const fs = require("fs");
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

module.exports = (audioBuffer, model) => {
  const model = model;
  try {
    result = transcriptBuffer(audioBuffer, model);
  } catch (error) {
    throw `transcriptBuffer: ${error}`;
  }

  return result;
};
