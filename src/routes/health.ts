import Router from '@koa/router';

import db from '../db';
import log from '../log';

const router = new Router();

router.get('/health', async ctx => {
    const start = Date.now();

    try {
        const [row] = await db.query('SELECT version()');
        if (!row || !row.version) throw new Error('no DB version found');

        const duration = Date.now() - start;
        ctx.body = { status: 'up', duration, db_version: row.version };
    } catch (error) {
        const duration = Date.now() - start;
        log.error('database health check failed', { error });
        ctx.body = { status: 'down', duration, error: String(error) };
    }
});

export default router;
