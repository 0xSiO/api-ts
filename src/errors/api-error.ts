import crypto from 'node:crypto';

import VError from 'verror';

interface ApiErrorOptions {
    message: string;
    details?: VError.Info;
    cause?: Error | null;
}

interface SerializedError {
    id: string;
    name: string;
    message: string;
    details: VError.Info;
    stack: string;
}

class ApiError extends VError.WError {
    public readonly id: string = crypto.randomUUID();

    constructor(options: ApiErrorOptions) {
        super({ cause: options.cause, info: options.details }, options.message);
        this.name = this.constructor.name;
    }

    static serialize(error: unknown): SerializedError {
        if (error instanceof Error) {
            return {
                id: error instanceof ApiError ? error.id : crypto.randomUUID(),
                name: error.name,
                message: error.message,
                details: VError.info(error),
                stack: VError.fullStack(error),
            };
        } else {
            return ApiError.serialize(
                new ApiError({
                    message: 'A non-Error object was thrown',
                    details: { object: error },
                })
            );
        }
    }
}

export { ApiErrorOptions, SerializedError, ApiError };
