import { Hono } from 'hono';

import db from '../db';
import log from '../log';

const metaRoutes = new Hono();

metaRoutes.get('/health', async c => {
    const start = Date.now();

    try {
        const [row] = (await db.query('SELECT version()')) as [{ version: string }];
        const duration = Date.now() - start;
        return c.json({ status: 'up', duration, db_version: row.version });
    } catch (error) {
        const duration = Date.now() - start;
        log.error('database health check failed', { error });
        return c.json({ status: 'down', duration, error: String(error) });
    }
});

export default metaRoutes;
