import { ApiError, ApiErrorOptions } from './api-error';

class HttpError extends ApiError {
    public readonly status: number;

    constructor(status: number, options: ApiErrorOptions) {
        super(options);
        this.status = status;
    }
}

export { HttpError };
