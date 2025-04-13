const path = require("path");
const fs = require("fs");

// Dynamically import the correct config file
const loadConfig = (strategy) => {
  const configPath = path.join(__dirname, `../configs/${strategy}-config.js`);

  // Check if the config file exists
  if (fs.existsSync(configPath)) {
    console.log(`Loading configuration for strategy: ${strategy}`);
    return require(configPath);
  } else {
    console.warn(
      `Configuration file for ${strategy} not found. Using default.`
    );
    return require("/configs/round-robin-config.js");
  }
};

module.exports = { loadConfig };
