const log4js = require('log4js');

log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: './logs/debug.log',
            flags: 'w',
            pattern: '.yyyy-MM-dd-hh-mm-ss',
            alwaysIncludePattern: true
        },
    },
    categories: { default: { appenders: ['cheese'], level: 'ALL' } },
});

const logger = log4js.getLogger('cheese');


module.exports.logger = logger;
