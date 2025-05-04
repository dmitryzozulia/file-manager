const readline = require("readline");
const os = require("os");
const { handleCommand } = require("./commands/handleCommand");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userName = process.env.npm_config_username || "Guest";

let currentDir = os.homedir();

const displayCurrentDirectory = () => {
  console.log("You are currently in", currentDir);
  rl.prompt();
};

const startApp = () => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  displayCurrentDirectory();
  rl.on("line", (input) => {
    handleCommand(input.trim(), currentDir)
      .then((result) => {
        if (result) {
          currentDir = result;
        }
        displayCurrentDirectory(currentDir);
      })
      .catch((error) => {
        console.error(error);
        displayCurrentDirectory();
      });
  });
};
startApp();
