import cluster from 'cluster';
import os from 'os';
import process from 'process';

import app from './app';
import db from './db';

(async () => {
    if (cluster.isPrimary) {
        console.info('primary online', { pid: process.pid });

        await db.initialize();

        cluster.on('exit', (worker, code, signal) => {
            console.warn('worker died, restarting...', {
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
        console.info('worker online', { pid: process.pid });
        app.listen(3000);
    }
})();
