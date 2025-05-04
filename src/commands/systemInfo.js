const os = require("os");

const systemInfo = async (infoType) => {
  if (!infoType) {
    console.log("OS info operation failed. Info type is not provided.");
    return;
  }
  switch (infoType.slice(2)) {
    case "EOL":
      console.log("EOL:", JSON.stringify(os.EOL));
      break;
    case "cpus":
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(
          `CPU ${index + 1}: Model: ${cpu.model.trim()}, Speed: ${(
            cpu.speed / 1000
          ).toFixed(2)} GHz`
        );
      });
      break;
    case "homedir":
      console.log("Home Directory:", os.homedir());
      break;
    case "username":
      console.log("Username:", os.userInfo().username);
      break;
    case "architecture":
      console.log("Architecture:", os.arch());
      break;
    default:
      console.log("Invalid OS info type. Please try again.");
  }
};

module.exports = systemInfo;
