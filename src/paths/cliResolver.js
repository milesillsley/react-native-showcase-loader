const fs = require('fs');
const logger = require('../logger');

const cliResolver = yargv => {
  logger.debug('cliResolver', yargv);
  if (!yargv || typeof yargv !== 'object') {
    return {};
  }

  const config = {};

  if (yargv.config) {
    const configContents = JSON.parse(fs.readFileSync(yargv.config));
    config.searchDir = Array.isArray(configContents) ? configContents : [];
  } else if (
    yargv.searchDir &&
    Array.isArray(yargv.searchDir) &&
    !yargv.config
  ) {
    config.searchDir = yargv.searchDir;
  } else if (yargv.searchDir && !Array.isArray(yargv.searchDir)) {
    config.searchDir = [yargv.searchDir];
  }

  if (yargv.outputFile) {
    config.outputFile = yargv.outputFile;
  }

  if (yargv.pattern) {
    config.pattern = yargv.pattern;
  }
  logger.debug('cliResolver:return', config);
  return config;
};

module.exports = cliResolver;
