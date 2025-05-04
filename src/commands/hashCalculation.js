const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const hashCalculation = async (currentDir, filePath) => {
  if (!filePath) {
    console.log("FS operation failed. File path is not provided.");
    return;
  }

  const absolutePath = path.resolve(currentDir, filePath);

  if (!fs.existsSync(absolutePath)) {
    console.log("FS operation failed. File does not exist.");
    return;
  }

  if (!fs.statSync(absolutePath).isFile()) {
    console.log("FS operation failed. File is not a file.");
    return;
  }

  console.log("Hash calculation in progress...");

  const hash = createHash("sha256");
  const stream = fs.createReadStream(absolutePath);

  stream.on("readable", () => {
    const data = stream.read();
    if (data) {
      hash.update(data);
    } else {
      console.log("File hash: ", hash.digest("hex"));
    }
  });
};

module.exports = hashCalculation;
