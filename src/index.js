// src/index.js
const { createOrUpdateFile } = require('./services/fileService');
const { runGitCommands } = require('./services/gitService');

async function main() {
  try {
    const fileMessage = await createOrUpdateFile();
    console.log(fileMessage);

    const gitMessage = await runGitCommands();
    console.log(gitMessage);
  } catch (error) {
    console.error(error);
  }
}

main();
