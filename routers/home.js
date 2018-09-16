/**
 * 主页子路由
 */

const router = require('koa-router')();

router.prefix('/home');

router.get('/', (ctx) => {
    ctx.body = 'index';
});

module.exports = router;

