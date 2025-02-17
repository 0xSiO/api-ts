import type { Context } from 'hono';

import { ApiError, HttpError } from './errors';
import log from './log';

const errorHandler = async (err: Error, c: Context) => {
    const serialized = ApiError.serialize(err);
    let res: Response;

    if (err instanceof HttpError) {
        c.status(err.status);
        res = c.json({
            id: serialized.id,
            status: err.status,
            message: serialized.message,
            details: serialized.details,
        });
    } else {
        // Don't expose unknown error details to the user
        c.status(500);
        res = c.json({
            id: serialized.id,
            status: 500,
            message: 'An unknown error occurred',
            details: {},
        });
    }

    if (c.res.status < 500) {
        log.warn('client error', { status: c.res.status, error: serialized });
    } else {
        log.error('server error', { status: c.res.status, error: serialized });
    }

    return res;
};

export default errorHandler;
