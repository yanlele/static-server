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
    console.log(JSON.stringify(returnObject));
    ctx.body = returnObject;
});

module.exports = router;

