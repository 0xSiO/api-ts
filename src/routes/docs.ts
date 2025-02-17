import { Hono } from 'hono';

import apiDef from '../../docs/openapi';

const SWAGGER_UI_VERSION = '5';

const docsRoutes = new Hono();

docsRoutes.get('/openapi.json', async c => c.json(apiDef));

docsRoutes.get('/', async c =>
    c.html(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({ url: '/docs/openapi.json', dom_id: '#swagger-ui' });
    };
  </script>
</body>
</html>`),
);

export default docsRoutes;
