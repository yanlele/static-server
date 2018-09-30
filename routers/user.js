const router = require('koa-router')();
const UserController = require('../controllers/user');

router.prefix('/api/user');
const routers = router
    .post('/signIn/', UserController.signIn)
    .post('/signUp/', UserController.signUp)
    .get('/signOut/', UserController.signOut)
    .get('/get-userInfo/', UserController.getUserInfo)
    .get('/check-valid/', UserController.checkValid)
    .get('/forget-get-question/', UserController.forgetGetQuestion)
    .get('/checkAnswer/', UserController.forgetCheckAnswer)


module.exports = routers;