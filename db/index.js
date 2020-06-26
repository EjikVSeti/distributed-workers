const mongoose = require('mongoose');
const config = require('config');
const UrlModel = require('./models/Url');
const { handleError } = require('../utils/handleError');
const { logger } = require('../logger');

const connectDb = async () => {
    const mongoUri = config.get('mongoUri');
    logger.info(`mongoDb options: ${mongoUri}`)
    return mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
}

const changeUrl = async (id, status, http_code = null) => {
    try {
        const url = await UrlModel.findById(id)
        url.http_code = http_code;
        url.status = status;
        await url.save();
    } catch (e) {
        handleError(e, 'DB error');
    }
}

const getAllUrls = async () => {
    try {
        return UrlModel.find();
    } catch (e) {
        handleError(e, 'DB error');
    }
}

module.exports = {
    connectDb,
    changeUrl,
    getAllUrls,
}
