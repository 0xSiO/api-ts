import { Context, Next } from 'koa';

import log from '../log';

export default async (_ctx: Context, next: Next) => {
    return log.withContext({}, next);
};
