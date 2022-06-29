import Router from '@koa/router';

import apiDefinition from '../../docs/openapi';

const router = new Router();

router.get('/docs/openapi.json', async ctx => (ctx.body = apiDefinition));

router.get('/docs', async ctx => {
    ctx.body = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.12.0/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@4.12.0/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({ url: '/docs/openapi.json', dom_id: '#swagger-ui' });
    };
  </script>
</body>
</html>`;
});

export default router;
