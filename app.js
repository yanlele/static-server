const koa = require('koa');
const app = new koa();
const views = require('koa-views');
const json = require('koa-json');
const onError = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logs-middleware');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const config = require('./config');
const path = require('path');
const pkg = require('./package.json');

const routing = require('./routers/index');
const THIRTY_MINTUES =12 * 60 * 60 * 1000;
// 处理错误
onError(app);

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

const redisConfig = {
    port: config.redis.PORT,
    host: config.redis.HOST,
    db: config.redis.DB,
    ttl: 1000 * 60 * 60 ,               // 失效时间
};

// 配置session 中间件
app.keys = ['keys', 'keyskeys'];            // redis cookies 签名，必须要
app.use(session({
    store: redisStore(redisConfig)
}));

// 解析body
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());

// 加载日志
app.use(logger({
    defaultPath: path.resolve(__dirname, 'logs'),
    applicationName: 'app'
}));


// 设置静态模板目录
app.use(require('koa-static')(__dirname + '/views'));

// 设置模板引擎
app.use(views(__dirname + '/views'),  {
    extension: 'html'
});

/*// 开发输入日志
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});*/

// 装在路由
routing(app);

module.exports = app;


