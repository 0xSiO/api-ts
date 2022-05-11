import crypto from 'crypto';

import { WError, Info } from 'verror';

interface Options {
    message: string;
    details?: Info;
    cause?: Error | null;
}

class ApiError extends WError {
    public readonly id: string = crypto.randomUUID();

    constructor(options: Options) {
        super({ cause: options.cause, info: options.details }, options.message);
        this.name = this.constructor.name;
    }
}

abstract class HttpError extends ApiError {
    public readonly status: number;

    constructor(status: number, options: Options) {
        super(options);
        this.status = status;
    }
}

class InternalError extends HttpError {
    constructor(options: Options) {
        super(500, options);
    }
}

class BadRequestError extends HttpError {
    constructor(options: Options) {
        super(400, options);
    }
}

export { ApiError, HttpError, InternalError, BadRequestError };
