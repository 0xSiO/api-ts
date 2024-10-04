import type { Context } from 'koa';

import db from '../db';
import log from '../log';

export default {
    async checkHealth(ctx: Context) {
        const start = Date.now();

        try {
            const [row] = (await db.query('SELECT version()')) as [{ version: string }];
            const duration = Date.now() - start;
            ctx.body = { status: 'up', duration, db_version: row.version };
        } catch (error) {
            const duration = Date.now() - start;
            log.error('database health check failed', { error });
            ctx.body = { status: 'down', duration, error: String(error) };
        }
    },
};
