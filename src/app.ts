import Koa from 'koa';
import koaBody from 'koa-body';
import Router from '@koa/router';

import healthRouter from './routes/health';

const app = new Koa();
const router = new Router();

router.use(koaBody());
router.use(healthRouter.routes());

app.use(router.routes());

export default app;
