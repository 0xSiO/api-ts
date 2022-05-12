import Koa from 'koa';
import koaBody from 'koa-body';
import Router from '@koa/router';

import errorHandler from './middleware/error-handler';
import logContext from './middleware/log-context';
import healthRouter from './routes/health';

const app = new Koa();
app.use(logContext);
app.use(errorHandler);

const router = new Router();

router.use(koaBody());
router.use(healthRouter.routes());

app.use(router.routes());

export default app;
