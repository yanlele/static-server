const router = require('koa-router')();
const userController = require('../constrollers/user');

router.prefix('/api/user');
const routers = router
    .post('/signIn/', userController.signIn)
    .post('/signUp/', userController.signUp)
    .get('/signOut/', userController.signOut)
    .get('/get_userInfo', userController.getUserInfo)

module.exports = routers;