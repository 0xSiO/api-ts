import { getConnInfo } from '@hono/node-server/conninfo';
import { createMiddleware } from 'hono/factory';
import * as uuid from 'uuid';

import log from '../log';

export default {
    logContext: createMiddleware(async (_c, next) => log.withContext({}, next)),

    requestId: createMiddleware(async (c, next) => {
        const requestId = uuid.validate(c.req.header('x-request-id'))
            ? c.req.header('x-request-id')
            : uuid.v7();
        log.addContext({ request_id: requestId });

        await next();

        c.header('x-request-id', requestId);
    }),

    logRequestResponse: createMiddleware(async (c, next) => {
        log.addContext({ method: c.req.method, url_path: c.req.path });
        log.info('request', {
            accept: c.req.header('accept'),
            src_ip: getConnInfo(c).remote.address,
        });

        const start = Date.now();
        await next();

        log.info('response', { status: c.res.status, duration: Date.now() - start });
    }),
};
