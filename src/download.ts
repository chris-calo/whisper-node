#! /usr/bin/env node

// Javascript layer for using the whisper.cpp built-in model downloader scripts 
//
// npx whisper-node download

import shell from 'shelljs';

import readlineSync from 'readline-sync';

import {DEFAULT_MODEL, NODE_MODULES_MODELS_PATH} from './constants'

const MODELS_LIST = [
  "tiny",
  "tiny.en",
  "tiny-q5_1",
  "tiny.en-q5_1",
  "base",
  "base.en",
  "base-q5_1",
  "base.en-q5_1",
  "small",
  "small.en",
  "small.en-tdrz",
  "small-q5_1",
  "small.en-q5_1",
  "medium",
  "medium.en",
  "medium-q5_0",
  "medium.en-q5_0",
  "large-v1",
  "large-v2",
  "large-v2-q5_0",
  "large-v3",
  "large-v3-q5_0",
  "large-v3-turbo",
  "large-v3-turbo-q5_0",
];


const askModel = async () => {
  const answer = await readlineSync.question(`\n[whisper-node] Enter model name (e.g. 'base.en') or 'cancel' to exit\n(ENTER for base.en): `)

  if (answer === "cancel") {
    console.log("[whisper-node] Exiting model downloader. Run again with: 'npx whisper-node download'");
    process.exit(0);
  }
  // user presses enter
  else if (answer === "") {
    console.log("[whisper-node] Going with", DEFAULT_MODEL);
    return DEFAULT_MODEL;
  }
  else if (!MODELS_LIST.includes(answer)) {
    console.log("\n[whisper-node] FAIL: Name not found. Check your spelling OR quit wizard and use custom model.");

    // re-ask question
    return await askModel();
  }

  return answer;
}



export default async function downloadModel() {
  try {
    // shell.exec("echo $PWD");
    shell.cd(NODE_MODULES_MODELS_PATH);

    console.log(`
| Model               | Disk   | RAM     |
|---------------------|--------|---------|
| tiny                | XX MB  | ~XXXMB  |
| tiny.en             | XX MB  | ~XXXMB  | 
| tiny-q5_1           | XX MB  | ~XXXMB  |
| tiny.en-q5_1        | XX MB  | ~XXXMB  |
| base                | XX MB  | ~XXXMB  |
| base.en             | XX MB  | ~XXXMB  |
| base-q5_1           | XX MB  | ~XXXMB  |
| base.en-q5_1        | XX MB  | ~XXXMB  |
| small               | XX MB  | ~XXXMB  |
| small.en            | XX MB  | ~XXXMB  |
| small.en-tdrz       | XX MB  | ~XXXMB  |
| small-q5_1          | XX MB  | ~XXXMB  |
| small.en-q5_1       | XX MB  | ~XXXMB  |
| medium              | XX MB  | ~XXXMB  |
| medium.en           | XX MB  | ~XXXMB  |
| medium-q5_0         | XX MB  | ~XXXMB  |
| medium.en-q5_0      | XX MB  | ~XXXMB  |
| large-v1            | XX MB  | ~XXXMB  |
| large-v2            | XX MB  | ~XXXMB  |
| large-v2-q5_0       | XX MB  | ~XXXMB  |
| large-v3            | XX MB  | ~XXXMB  |
| large-v3-q5_0       | XX MB  | ~XXXMB  |
| large-v3-turbo      | XX MB  | ~XXXMB  |
| large-v3-turbo-q5_0 | XX MB  | ~XXXMB  |
`);

    // ensure running in correct path
    if (!shell.which("./download-ggml-model.sh")) {
      throw "whisper-node downloader is not being run from the correct path! cd to project root and run again."
    }

    const modelName = await askModel();

    // default is .sh
    let scriptPath = "./download-ggml-model.sh"
    // windows .cmd version
    if(process.platform === 'win32') scriptPath = "download-ggml-model.cmd";

    shell.exec(`${scriptPath} ${modelName}`);

    // TODO: add check in case download-ggml-model doesn't return a successful download.
    // to prevent continuing to compile; that makes it harder for user to see which script failed.

    console.log("[whisper-node] Attempting to compile model...");

    // move up directory, run make in whisper.cpp
    shell.cd("../")
    // this has to run in whichever directory the model is located in??
    shell.exec("make");

    process.exit(0);
  } catch (error) {
    console.log("ERROR Caught in downloadModel")
    console.log(error);
    return error;
  }
}

// runs after being called in package.json
downloadModel();
