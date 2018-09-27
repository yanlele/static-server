const serverResponse = require('./../utils/serverResponse');
const userModel = require('./../models/user');

module.exports = {
    async signIn(ctx) {
        let {username, password} = ctx.request.body;

        if(!username) {
            return serverResponse.createErrorMessage('没有传入用户名');
        }
        if(!password) {
            return serverResponse.createErrorMessage('没有传入密码');
        }

        // 验证用户名是否正确
        let userInfo = await userModel.checkUserName(username);
        if(!userInfo) {
            return serverResponse.createErrorMessage('用户名错误');
        }

        // 验证密码是否正确
        userInfo = await userModel.checkUserByUsernameAndPassword(username, password);
        if(!userInfo) {
            return serverResponse.createErrorMessage('密码错误');
        }

        return userInfo;
    }
};