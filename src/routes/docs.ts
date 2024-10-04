import Router from '@koa/router';

import docsController from '../controllers/docs';

const router = new Router();

router.get('/docs/openapi.json', docsController.openApi);
router.get('/docs', docsController.swaggerDocs);

export default router;
