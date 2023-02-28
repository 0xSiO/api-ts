import { Context, Next } from 'koa';
import * as uuid from 'uuid';

import log from '../log';

const logContext = async (_ctx: Context, next: Next) => {
    return log.withContext({}, next);
};

const requestId = async (ctx: Context, next: Next) => {
    const requestId = uuid.validate(ctx.get('x-request-id'))
        ? ctx.get('x-request-id')
        : uuid.v4();
    log.addContext({ request_id: requestId });

    await next();

    ctx.set('x-request-id', requestId);
};

const logRequestResponse = async (ctx: Context, next: Next) => {
    log.addContext({ method: ctx.method, url_path: ctx.url });
    log.info('request', {
        accepts: ctx.accepts(),
        hostname: ctx.hostname,
        src_ip: ctx.ip,
        protocol: ctx.protocol,
    });

    const start = Date.now();
    await next();

    log.info('response', {
        status: ctx.status,
        content_length: ctx.length,
        duration: Date.now() - start,
    });
};

export { logContext, requestId, logRequestResponse };
