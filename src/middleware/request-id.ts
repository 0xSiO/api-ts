import crypto from 'node:crypto';

import { Context, Next } from 'koa';

import log from '../log';

export default async (ctx: Context, next: Next) => {
    const requestId = crypto.randomUUID();
    log.addContext({ requestId });
    await next();
    ctx.set('x-request-id', requestId);
};
