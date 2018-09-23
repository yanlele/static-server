/**
 * 与user相关的一些列的接口
 */

const router = require('koa-router')();
const userController = require('../constrollers/user-info');

router.prefix('/user');
const routers = router
    .post('/signIn', userController.signIn)
    .post('/singUp', userController.signUp)

module.exports = routers;

