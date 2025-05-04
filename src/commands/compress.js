import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";

export const compress = async (currentDir, source, destination) => {
  const absoluteSourcePath = path.resolve(currentDir, source);
  const absoluteDestinationPath = path.resolve(currentDir, destination);

  if (fs.existsSync(absoluteSourcePath)) {
    const resource = fs.createReadStream(absoluteSourcePath);
    const destinationStream = fs.createWriteStream(absoluteDestinationPath);
    const brotli = zlib.createBrotliCompress();

    resource.pipe(brotli).pipe(destinationStream);

    destinationStream.on("finish", async () => {
      await fs.promises.unlink(absoluteSourcePath);
    });

    console.log("File was successfully compressed. Source file was deleted!");
  } else {
    console.error("No source file!");
  }
};
