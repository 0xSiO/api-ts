import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';

import app from './app';
import db from './db';
import log from './log';

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
