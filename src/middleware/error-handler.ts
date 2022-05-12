import { Context, Next } from 'koa';

import { ApiError, HttpError } from '../errors';
import log from '../log';

async function errorHandler(ctx: Context, next: Next) {
    try {
        await next();
    } catch (error) {
        const serialized = ApiError.serialize(error);
        log.error('unhandled error', { error: serialized });

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
    }
}

export default errorHandler;
