import readline from "readline";
import os from "os";
import { handleCommand } from "./commands/handleCommand.js";

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
    const trimmedInput = input.trim();
    if (trimmedInput === ".exit") {
      console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
      rl.close();
      process.exit(0);
    }
    handleCommand(trimmedInput, currentDir)
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

rl.on("SIGINT", () => {
  console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
  rl.close();
  process.exit(0);
});
