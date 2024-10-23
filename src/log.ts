import { AsyncLocalStorage } from 'node:async_hooks';

import { Logger } from 'tslog';

class ContextLogger<LogObj> extends Logger<LogObj> {
    private readonly context = new AsyncLocalStorage<Record<string, any>>();

    withContext<T>(context: Record<string, any>, fn: () => T): T {
        return this.context.run(context, fn);
    }

    getContext(): Record<string, any> {
        return this.context.getStore() ?? {};
    }

    addContext(context: Record<string, any>): void {
        Object.assign(this.getContext(), context);
    }

    silly(message: string, details?: Record<string, any>) {
        return super.silly(message, { ...this.getContext(), ...details });
    }

    trace(message: string, details?: Record<string, any>) {
        return super.trace(message, { ...this.getContext(), ...details });
    }

    debug(message: string, details?: Record<string, any>) {
        return super.debug(message, { ...this.getContext(), ...details });
    }

    info(message: string, details?: Record<string, any>) {
        return super.info(message, { ...this.getContext(), ...details });
    }

    warn(message: string, details?: Record<string, any>) {
        return super.warn(message, { ...this.getContext(), ...details });
    }

    error(message: string, details?: Record<string, any>) {
        return super.error(message, { ...this.getContext(), ...details });
    }

    fatal(message: string, details?: Record<string, any>) {
        return super.fatal(message, { ...this.getContext(), ...details });
    }
}

export default new ContextLogger({});
