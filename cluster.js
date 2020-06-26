const cluster = require('cluster');
const { connectDb } = require('./db');
const { runMaster } = require('./master');
const { runWorker } = require('./worker');
const { logger } = require('./logger');
const { handleError } = require('./utils/handleError');

async function start() {
    await connectDb();

    if (cluster.isMaster) {
        try {
            await runMaster();

            const cpuCounts = require('os').cpus().length;
            for (let i = 0; i < cpuCounts - 1; i++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code) => {
                logger.fatal(`Worker fell down. Pid: ${ worker.process.pid }. Code: ${ code }`);
                if (code === 1) {
                    cluster.fork();
                }
            });
        } catch (e) {
           handleError(e);
        }

    } else {
        await runWorker();
    }
}

start();
