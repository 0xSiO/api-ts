import Router from '@koa/router';

import metaController from '../controllers/meta';

const router = new Router();

router.get('/meta/health', metaController.checkHealth);

export default router;
