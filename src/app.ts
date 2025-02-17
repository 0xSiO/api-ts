import { Hono } from 'hono';

import errorHandler from './error-handler';
import instrumentation from './middleware/instrumentation';
import docsRoutes from './routes/docs';
import metaRoutes from './routes/meta';

const app = new Hono();
app.use(instrumentation.logContext);
app.use(instrumentation.requestId);
app.use(instrumentation.logRequestResponse);
app.onError(errorHandler);

app.route('/docs', docsRoutes);
app.route('/meta', metaRoutes);

export default app;
