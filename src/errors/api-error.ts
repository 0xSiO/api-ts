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
    public readonly id: string = uuid.v4();

    constructor(options: ApiErrorOptions) {
        super({ cause: options.cause, info: options.details }, options.message);
        this.name = this.constructor.name;
    }

    static serialize(error: unknown): SerializedError {
        return error instanceof Error
            ? {
                  id: error instanceof ApiError ? error.id : uuid.v4(),
                  name: error.name,
                  message: error.message,
                  details: VError.info(error),
                  stack: VError.fullStack(error),
              }
            : ApiError.serialize(
                  new ApiError({
                      message: 'A non-Error object was thrown',
                      details: { object: error },
                  })
              );
    }
}

export { ApiErrorOptions, SerializedError, ApiError };
