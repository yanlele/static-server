const router = require('koa-router')();
const userController = require('../constrollers/user');

router.prefix('/api/user');
const routers = router
    .post('/signIn/', userController.signIn)
    .post('/signUp/', userController.signUp)

module.exports = routers;