import fs from "node:fs";
import path from "node:path";

export const readFile = async (currentDir, filePath) => {
  if (!filePath) {
    console.log("FS operation failed. File path is not provided.");
    return;
  }
  const absolutePath = path.resolve(currentDir, filePath);
  const readStream = fs.createReadStream(absolutePath);
  readStream.on("data", (chunk) => {
    console.log("Reading chunk:", chunk.toString());
  });
};

export const addFile = async (currentDir, fileName) => {
  if (!fileName) {
    console.log("FS operation failed. File name is not provided.");
    return;
  }
  const filePath = path.join(currentDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log("FS operation failed. File already exists.");
  } else {
    try {
      await fs.promises.writeFile(filePath, "");
      console.log(`File ${fileName} created successfully.`);
    } catch (err) {
      console.error("Error creating file:", err.message);
    }
  }
};

export const createDirectory = async (currentDir, dirName) => {
  if (!dirName) {
    console.log("FS operation failed. Directory name is not provided.");
    return;
  }
  const dirPath = path.join(currentDir, dirName);
  if (fs.existsSync(dirPath)) {
    console.log("FS operation failed. Directory already exists.");
  } else {
    try {
      await fs.promises.mkdir(dirPath, { recursive: true });
      console.log(`Directory ${dirName} created successfully.`);
    } catch (err) {
      console.error("Error creating directory:", err.message);
    }
  }
};

export const rename = async (currentDir, oldName, newName) => {
  if (!oldName || !newName) {
    console.log("FS operation failed. Old name or new name is not provided.");
    return;
  }
  if (oldName === newName) {
    console.log("FS operation failed. Old name and new name are the same.");
    return;
  }
  if (!fs.existsSync(path.join(currentDir, oldName))) {
    console.log("FS operation failed. File does not exist.");
    return;
  }
  if (fs.existsSync(path.join(currentDir, newName))) {
    console.log("FS operation failed. New name already exists.");
    return;
  }
  try {
    await fs.promises.rename(
      path.join(currentDir, oldName),
      path.join(currentDir, newName)
    );
    console.log(`File renamed from ${oldName} to ${newName} successfully.`);
  } catch (err) {
    console.error("Error renaming file:", err.message);
  }
};

export const remove = async (currentDir, fileName) => {
  if (!fileName) {
    console.log("FS operation failed. File name is not provided.");
    return;
  }
  const filePath = path.join(currentDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.log("FS operation failed. File does not exist.");
    return;
  }
  try {
    await fs.promises.unlink(filePath);
    console.log(`File ${fileName} deleted successfully.`);
  } catch (err) {
    console.error("Error deleting file:", err.message);
  }
};

export const copy = async (currentDir, source, destination) => {
  if (!source || !destination) {
    console.log("FS operation failed. Source or destination is not provided.");
    return;
  }
  const sourcePath = path.join(currentDir, source);
  const destPath = path.join(currentDir, `${destination}/${source}`);
  if (!fs.existsSync(sourcePath)) {
    console.log("FS operation failed. Source file does not exist.");
    return;
  }
  if (fs.existsSync(destPath)) {
    console.log("FS operation failed. Destination file already exists.");
    return;
  }
  if (sourcePath === destPath) {
    console.log("FS operation failed. Source and destination are the same.");
    return;
  }
  try {
    await fs.promises.copyFile(sourcePath, destPath);
    console.log(`File copied from ${sourcePath} to ${destPath} successfully.`);
  } catch (err) {
    console.error("Error copying file:", err.message);
  }
};

export const move = async (currentDir, source, destination) => {
  await copy(currentDir, source, destination);
  await remove(currentDir, source);
};
