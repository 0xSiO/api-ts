import { Context, Next } from 'koa';
import * as uuid from 'uuid';

import log from '../log';

export default async (ctx: Context, next: Next) => {
    const requestId = uuid.validate(ctx.get('x-request-id'))
        ? ctx.get('x-request-id')
        : uuid.v4();
    log.addContext({ requestId });
    await next();
    ctx.set('x-request-id', requestId);
};
