import Router from '@koa/router';

import log from '../log';

const router = new Router();

router.get('/health', async ctx => {
    log.debug('health check requested', ctx);
    ctx.body = { status: 'ok' };
});

export default router;
