const { changeUrl, getAllUrls } = require('./db');
const { requestUrlQueue } = require('./queue');
const { UrlStatuses } = require('./constants');
const { logger } = require('./logger');

module.exports.runMaster = async() => {
    const urlsForRequested = await getAllUrls();
    logger.debug(`Get ${urlsForRequested.length} jobs for requested.`);

    const options = {
        delay: 1000,
        attempts: 1
    };

    for (const requestData of urlsForRequested) {
        requestUrlQueue.add(requestData, options);

        await changeUrl(requestData._id, UrlStatuses.PROCESSING);
    }
}
