import { Context, Next } from 'koa';

import { ApiError, HttpError } from '../errors';
import log from '../log';

async function errorHandler(ctx: Context, next: Next) {
    try {
        await next();
    } catch (error) {
        const serialized = ApiError.serialize(error);

        if (error instanceof HttpError) {
            ctx.status = error.status;
            ctx.body = {
                id: serialized.id,
                status: error.status,
                message: serialized.message,
                details: serialized.details,
            };
        } else {
            // Don't expose unknown errors to the user
            ctx.status = 500;
            ctx.body = {
                id: serialized.id,
                status: 500,
                message: 'An unknown error occurred',
                details: {},
            };
        }

        if (ctx.status < 500) {
            log.warn('client error', { status: ctx.status, error: serialized });
        } else {
            log.error('server error', { status: ctx.status, error: serialized });
        }
    }
}

export default errorHandler;
