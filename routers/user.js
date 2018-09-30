const router = require('koa-router')();
const UserController = require('../constrollers/user');

router.prefix('/api/user');
const routers = router
    .post('/signIn/', UserController.signIn)
    .post('/signUp/', UserController.signUp)
    .get('/signOut/', UserController.signOut)
    .get('/get-userInfo/', UserController.getUserInfo)
    .get('/check-valid/', UserController.checkValid)

module.exports = routers;