import { AsyncLocalStorage } from 'node:async_hooks';

import { ILogObject, Logger } from 'tslog';

class ContextLogger extends Logger {
    private readonly context: AsyncLocalStorage<object> = new AsyncLocalStorage();

    withContext(context: object, fn: () => unknown): unknown {
        return this.context.run(context, fn);
    }

    getContext(): object {
        return this.context.getStore() || {};
    }

    addContext(context: object): void {
        Object.assign(this.getContext(), context);
    }

    silly(message: string, details: object): ILogObject {
        return super.silly(message, Object.assign(this.getContext(), details));
    }

    trace(message: string, details: object): ILogObject {
        return super.trace(message, Object.assign(this.getContext(), details));
    }

    debug(message: string, details: object): ILogObject {
        return super.debug(message, Object.assign(this.getContext(), details));
    }

    info(message: string, details: object): ILogObject {
        return super.info(message, Object.assign(this.getContext(), details));
    }

    warn(message: string, details: object): ILogObject {
        return super.warn(message, Object.assign(this.getContext(), details));
    }

    error(message: string, details: object): ILogObject {
        return super.error(message, Object.assign(this.getContext(), details));
    }

    fatal(message: string, details: object): ILogObject {
        return super.fatal(message, Object.assign(this.getContext(), details));
    }
}

export default new ContextLogger({});
