const https = require('follow-redirects').https;
const { changeUrl } = require('./db');
const { requestUrlQueue } = require('./queue');
const { UrlStatuses } = require('./constants');
const { logger } = require('./logger');
const { handleError } = require('./utils/handleError');
const pid = process.pid;

async function handleRequestUrl(data) {
    try {
        const request = await https.get(data.url, async (response) => {
            if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                await changeUrl(data._id, UrlStatuses.DONE, response.statusCode);
                logger.debug(`Response Done. Url: ${ data.url } status code: ${ response.statusCode }. Pid: ${ pid }`);
            } else {
                await changeUrl(data._id, UrlStatuses.ERROR, response.statusCode);
                logger.error(`Response Error. Url: ${ data.url } status code: ${ response.statusCode || null }. Pid: ${ pid }`);
            }
        });

        request.on("error", async (error) => {
            await changeUrl(data._id, UrlStatuses.ERROR, error.statusCode || null);
            logger.error(`Error response. Url: ${ data.url } status code: ${ error.statusCode || null }. Pid: ${ pid }`);
        });

    } catch (e) {
        await changeUrl(data._id, UrlStatuses.ERROR);
        logger.error(`Server error. Url: ${ data.url } Pid: ${ pid }`);
        process.exit(1);
    }
}

module.exports.runWorker = async () => {
    try {
        requestUrlQueue.process(async job => {
            logger.debug(`job: ${ job.data.url }. Pid: ${ pid }`);
            return await handleRequestUrl(job.data);
        });
    } catch (e) {
        handleError(` Pid: ${ pid }. Server error: `, e);
        process.exit(1);
    }
};
