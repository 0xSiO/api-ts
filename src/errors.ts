import * as uuid from 'uuid';
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
    public readonly id: string = uuid.v7();

    constructor(options: ApiErrorOptions) {
        super({ cause: options.cause, info: options.details }, options.message);
        this.name = this.constructor.name;
    }

    static serialize(error: unknown): SerializedError {
        return error instanceof Error
            ? {
                  id: error instanceof ApiError ? error.id : uuid.v7(),
                  name: error.name,
                  message: error.message,
                  details: VError.info(error),
                  stack: VError.fullStack(error),
              }
            : ApiError.serialize(
                  new ApiError({
                      message: 'A non-Error object was thrown',
                      details: { object: error },
                  }),
              );
    }
}

class HttpError extends ApiError {
    public readonly status: number;

    constructor(status: number, options: ApiErrorOptions) {
        super(options);
        this.status = status;
    }
}

export type { ApiErrorOptions, SerializedError };
export { ApiError, HttpError };
