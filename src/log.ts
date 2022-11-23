import { AsyncLocalStorage } from 'node:async_hooks';

import { Logger } from 'tslog';

class ContextLogger<LogObj> extends Logger<LogObj> {
    private readonly context = new AsyncLocalStorage<object>();

    withContext<T>(context: object, fn: () => T): T {
        return this.context.run(context, fn);
    }

    getContext(): object {
        return this.context.getStore() ?? {};
    }

    addContext(context: object): void {
        Object.assign(this.getContext(), context);
    }

    silly(message: string, details?: object) {
        return super.silly(message, { ...this.getContext(), ...details });
    }

    trace(message: string, details?: object) {
        return super.trace(message, { ...this.getContext(), ...details });
    }

    debug(message: string, details?: object) {
        return super.debug(message, { ...this.getContext(), ...details });
    }

    info(message: string, details?: object) {
        return super.info(message, { ...this.getContext(), ...details });
    }

    warn(message: string, details?: object) {
        return super.warn(message, { ...this.getContext(), ...details });
    }

    error(message: string, details?: object) {
        return super.error(message, { ...this.getContext(), ...details });
    }

    fatal(message: string, details?: object) {
        return super.fatal(message, { ...this.getContext(), ...details });
    }
}

export default new ContextLogger({});
