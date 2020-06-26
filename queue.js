const Queue = require('bull');
const config = require('config');
const { logger } = require('./logger');

const redis = config.get('redisOptions');

logger.info(`Redis options: ${ JSON.stringify(redis) }`)
const requestUrlQueue = new Queue('requestUrl', { redis });

module.exports = {
    requestUrlQueue,
};
