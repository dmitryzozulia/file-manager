import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { pipeline } from "node:stream/promises";

export const decompress = async (currentDir, source, destination) => {
  const absoluteSourcePath = path.resolve(currentDir, source);
  const absoluteDestinationPath = path.resolve(currentDir, destination);

  if (fs.existsSync(absoluteSourcePath)) {
    const resource = fs.createReadStream(absoluteSourcePath);
    const destinationStream = fs.createWriteStream(absoluteDestinationPath);
    const brotli = zlib.createBrotliDecompress();
    await pipeline(resource, brotli, destinationStream);
    console.log("File was successfully decompressed!");
    await fs.promises.unlink(absoluteSourcePath);
  } else {
    console.error("No source file to decompress!");
    return;
  }
};
