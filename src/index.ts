import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';

import app from './app';
import db from './db';
import { ApiError } from './errors';
import log from './log';

process.on('uncaughtExceptionMonitor', error => {
    log.fatal('uncaught exception', {
        pid: process.pid,
        error: ApiError.serialize(error),
    });
});

(async () => {
    if (cluster.isPrimary) {
        log.info('primary online', { pid: process.pid });
        await db.initialize();

        cluster.on('online', worker => {
            log.info('worker online', { pid: worker.process.pid });
        });

        cluster.on('exit', (worker, code, signal) => {
            log.warn('worker died, restarting...', {
                pid: worker.process.pid,
                code,
                signal,
            });
            cluster.fork();
        });

        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }
    } else {
        await db.initialize();
        app.listen(3000, () => {
            log.info('HTTP server listening', { pid: process.pid, port: 3000 });
        });
    }
})();
