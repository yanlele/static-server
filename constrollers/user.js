const userService = require('./../services/user');
const userCode = require('./../enums/user');

module.exports = {
    // 登录接口
    async signIn(ctx) {
        let {username, password} = ctx.request.body;
        let response = await userService.signIn(username, password);
        // 直接存session
        if(response.success) {
            ctx.session = response.data;
        }
        ctx.body = response;
    },

    // 注册接口
    async signUp(ctx) {
        let {username, password, confirmPassword, email} = ctx.request.body;
        ctx.body = await userService.signUp(username, password, confirmPassword, email);
    }
};