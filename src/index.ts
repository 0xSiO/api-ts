import cluster from 'cluster';
import os from 'os';
import process from 'process';

import app from './app';
import db from './db';
import log from './log';

(async () => {
    if (cluster.isPrimary) {
        log.info('primary online', { pid: process.pid });

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

        log.info('worker online', { pid: process.pid });
        app.listen(3000);
    }
})();
