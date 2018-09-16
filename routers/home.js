/**
 * 主页子路由
 */

const router = require('koa-router')();

router.prefix('/home');

router.get('/', (ctx) => {
    const returnObject = {
        name: 'yanle',
        age: 35
    };
    ctx.logger.debug('return object', JSON.stringify(returnObject));
    ctx.logger.debug(JSON.stringify(ctx.query));
    ctx.body = returnObject;
});

module.exports = router;

