import cluster from 'node:cluster';
import crypto from 'node:crypto';
import os from 'node:os';
import process from 'node:process';

import app from './app';
import db from './db';
import log from './log';

process.on('uncaughtExceptionMonitor', error => {
    log.error('uncaught exception', {
        pid: process.pid,
        error: {
            id: crypto.randomUUID(),
            name: error.name,
            cause: error.cause,
            stack: error.stack,
            message: error.message,
        },
    });
});

(async () => {
    if (cluster.isPrimary) {
        log.info('primary online', { pid: process.pid });

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
        app.listen(3000);
    }
})();
