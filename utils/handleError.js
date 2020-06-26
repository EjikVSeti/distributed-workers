const { logger } = require('../logger');

module.exports.handleError = (e, msg = 'Error') => {
    logger.error(`${msg}: ${e.message || e}`);
}
