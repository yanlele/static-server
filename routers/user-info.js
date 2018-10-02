/**
 * 与user相关的一些列的接口
 */

const router = require('koa-router')();
const userController = require('../controllers/user-info');

router.prefix('/api/user-info');
const routers = router
    .post('/signIn/', userController.signIn)
    .post('/signUp/', userController.signUp)
    .get('/userInfo/', userController.getLoginUserInfo)
    .get('/set-session/', userController.setSession)
    .get('/get-session/', userController.getSession);

module.exports = routers;

