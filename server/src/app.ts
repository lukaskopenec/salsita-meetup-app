import { koaMiddleware } from 'cls-rtracer';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import * as Static from 'koa-static';
import * as Compress from 'koa-compress';

import apiRouter from './api';
import { errorHandler } from './helpers/middlewares';
import { APP_PATH } from './helpers/paths';
import logger from './helpers/logger';

const app = new Koa();
const router = new Router();

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

logger.info(`Application files are at ${APP_PATH}`);

app.use(Compress());
app.use(koaMiddleware());
app.use(Static(APP_PATH));
app.use(BodyParser());
app.use(errorHandler());
app.use(router.routes());

export default app;
