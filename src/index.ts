import cluster from 'cluster';
import os from 'os';
import process from 'process';

import app from './app';
import db from './db';
import log from './log';

(async () => {
    if (cluster.isPrimary) {
        log.info('primary online', { pid: process.pid });

        await db.initialize();

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
        log.info('worker online', { pid: process.pid });
        app.listen(3000);
    }
})();
