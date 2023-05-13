import moduleAlias from 'module-alias';
moduleAlias.addPath(__dirname);
moduleAlias();

import * as dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import qs from 'koa-qs';
import requestLogger from 'koa-logger';

import config from 'config';
import routes from 'routes';
import { AppKoa } from 'types';

const initKoa = () => {
  const app = new AppKoa();

  app.use(cors({ credentials: true }));
  app.use(helmet());
  qs(app as any);
  app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
    onerror: (err: Error, ctx) => {
      ctx.throw(422, 'Unable to parse request JSON.');
    },
  }));
  app.use(requestLogger());

  routes(app);

  return app;
};

const app = initKoa();

(async () => {
  const server = http.createServer(app.callback());

  server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
})();

export default app;
