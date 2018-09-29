const koa = require('koa');
const app = new koa();
const views = require('koa-views');
const json = require('koa-json');
const onError = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logs-middleware');
const session = require('koa-session-minimal');
const mysqlStore = require('koa-mysql-session');
const config = require('./config');
const path = require('path');
const pkg = require('./package.json');

const routing = require('./routers/index');
const THIRTY_MINTUES = 30 * 60 * 1000;
// 处理错误
onError(app);

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

// 配置session 中间件
app.use(session({
    key: 'USER_SID',
    store: new mysqlStore(sessionMysqlConfig),
    cookie: {
        maxage: THIRTY_MINTUES
    }
}));

// 解析body
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());

// 加载日志
/*app.use(logger({
    defaultPath: path.resolve(__dirname, 'logs'),
    applicationName: 'app'
}));*/


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


