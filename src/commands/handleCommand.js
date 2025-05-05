import { up, cd, ls } from "./navigation.js";
import {
  readFile,
  addFile,
  createDirectory,
  rename,
  remove,
  copy,
  move,
} from "./operations.js";
import { systemInfo } from "./systemInfo.js";
import { hashCalculation } from "./hashCalculation.js";
import { compress } from "./compress.js";
import { decompress } from "./decompress.js";

export async function handleCommand(input, currentDir) {
  const [command, ...args] = input.split(" ");
  try {
    switch (command) {
      case "ls":
        ls(currentDir);
        break;
      case "up":
        return up(currentDir);
      case "cd":
        return cd(currentDir, args[0]);
      case "cat":
        await readFile(currentDir, args[0]);
        break;
      case "add":
        await addFile(currentDir, args[0]);
        break;
      case "mkdir":
        await createDirectory(currentDir, args[0]);
        break;
      case "rn":
        await rename(currentDir, args[0], args[1]);
        break;
      case "rm":
        await remove(currentDir, args[0]);
        break;
      case "cp":
        await copy(currentDir, args[0], args[1]);
        break;
      case "mv":
        await move(currentDir, args[0], args[1]);
        break;
      case "os":
        await systemInfo(args[0]);
        break;
      case "hash":
        await hashCalculation(currentDir, args[0]);
        break;
      case "compress":
        await compress(currentDir, args[0], args[1]);
        break;
      case "decompress":
        await decompress(currentDir, args[0], args[1]);
        break;
      default:
        console.log("Command not found. Please try again.");
        break;
    }
  } catch (error) {
    console.error("Operation failed. Please try again.\n", error.message);
  }
}
