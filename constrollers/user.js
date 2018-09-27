const userService = require('./../services/user');
const userCode = require('./../enums/user');


module.exports = {
    // 登录接口
    async signIn(ctx) {
        let response = await userService.signIn(ctx);
    }
};