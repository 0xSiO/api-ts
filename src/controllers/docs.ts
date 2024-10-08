import type { Context } from 'koa';

import apiDefinition from '../../docs/openapi';

const SWAGGER_UI_VERSION = '5.17.14';

export default {
    openApi(ctx: Context) {
        ctx.body = apiDefinition;
    },
    swaggerDocs(ctx: Context) {
        ctx.body = `
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
</html>`;
    },
};
