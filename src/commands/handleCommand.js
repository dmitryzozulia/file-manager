const { up, cd, ls } = require("./navigation");

async function handleCommand(input, currentDir) {
  const [command, ...args] = input.split(" ");
  console.log("Command:", command, "Arguments:", args);
  try {
    switch (command) {
      case "ls":
        ls(currentDir);
        break;
      case "up":
        return up(currentDir);
      case "cd":
        return cd(currentDir, args[0]);
      default:
        console.log("Command not found. Please try again.");
        break;
    }
  } catch (error) {
    console.error("Operation falied. Please try again.\n", error.message);
  }
}

module.exports = { handleCommand };
