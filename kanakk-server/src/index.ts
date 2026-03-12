import Koa from "koa";
import Router from "koa-router";

import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import json from "koa-json";
import logger from "koa-logger";
import ratelimit from 'koa-ratelimit';

import sequelize from "./database/index";

const app = new Koa();

async function start() {
    try {
        await sequelize.authenticate();

        app.listen(3000, () => {
            console.log("Koa started at 3000!");
        });
    } catch (error) {
        console.error('Unable to connect to database:', error);
        process.exit(1);
    }
}

const router = new Router();

router.get("/", async (ctx, next) => {
    ctx.body = { msg: "Hello world!" };

    await next();
});

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(helmet());

const db = new Map();

app.use(ratelimit({
    driver: 'memory',
    db: db,
    duration: 60000,
    max: 100,
    id: (ctx) => ctx.ip
}));

app.use(router.routes()).use(router.allowedMethods());

start();