import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import Router from '@koa/router';

import errorHandler from './middleware/error-handler';
import { logContext, logRequestResponse, requestId } from './middleware/instrumentation';
import docsRouter from './routes/docs';
import metaRouter from './routes/meta';

const app = new Koa();
app.use(logContext);
app.use(requestId);
app.use(logRequestResponse);
app.use(errorHandler);

const router = new Router();

router.use(bodyParser());
router.use(docsRouter.routes());
router.use(metaRouter.routes());

app.use(router.routes());

export default app;
