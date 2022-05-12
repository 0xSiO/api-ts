import Koa from 'koa';
import koaBody from 'koa-body';
import Router from '@koa/router';

import errorHandler from './middleware/error-handler';
import logRequestResponse from './middleware/log-request-response';
import requestId from './middleware/request-id';
import healthRouter from './routes/health';
import log from './log';

const app = new Koa();
app.use(async (_ctx, next) => log.withContext({}, next));
app.use(requestId);
app.use(logRequestResponse);
app.use(errorHandler);

const router = new Router();

router.use(koaBody());
router.use(healthRouter.routes());

app.use(router.routes());

export default app;
