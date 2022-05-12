import { Context, Next } from 'koa';

import log from '../log';

export default async (ctx: Context, next: Next) => {
    log.addContext({ method: ctx.method, url_path: ctx.url });
    log.info('request', { accepts: ctx.accepts() });
    const start = Date.now();
    await next();
    log.info('response', { status: ctx.status, duration: Date.now() - start });
};
