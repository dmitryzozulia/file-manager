const fs = require("node:fs");
const path = require("node:path");

const up = (currentDir) => {
  const parentDirectory = path.resolve(currentDir, "..");
  if (fs.existsSync(parentDirectory)) {
    return parentDirectory;
  } else {
    throw new Error("Cannot go up from the root directory.");
  }
};

const cd = (currentDir, targetDir) => {
  const newPath = path.resolve(currentDir, targetDir);
  if (fs.existsSync(newPath)) {
    return newPath;
  } else {
    throw new Error(`Directory ${targetDir} does not exist.`);
  }
};

const ls = (currentDir) => {
  const items = fs.readdirSync(currentDir).sort((a, b) => a.localeCompare(b));
  const files = items.filter((file) =>
    fs.statSync(path.join(currentDir, file)).isFile()
  );
  const directories = items.filter((file) =>
    fs.statSync(path.join(currentDir, file)).isDirectory()
  );
  const sorted = [...directories, ...files];
  const output = [];
  sorted.forEach((item) => {
    output.push({
      Name: item,
      Type: fs.statSync(path.join(currentDir, item)).isDirectory()
        ? "directory"
        : "file",
    });
  });
  console.table(output);
};

module.exports = { up, cd, ls };
