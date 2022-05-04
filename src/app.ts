import Koa from 'koa';
import koaBody from 'koa-body';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

router.use(koaBody());

app.use(router.routes());

export default app;
