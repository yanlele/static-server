const {isObjEmpty} = require('../build/src/util/tool');
const userService = require('./../services/user');
const userCode = require('./../enums/user');
const serverResponse = require('./../utils/serverResponse');

module.exports = {
    // 登录接口
    async signIn(ctx) {
        let {username, password} = ctx.request.body;
        let response = await userService.signIn(username, password);
        // 直接存session
        if(response.success) {
            ctx.session = response.data;
        }
        return ctx.body = response;
    },

    // 注册接口
    async signUp(ctx) {
        let {username, password, confirmPassword, email} = ctx.request.body;
        return ctx.body = await userService.signUp(username, password, confirmPassword, email);
    },

    // 退出登录
    async signOut(ctx) {
        let currentUser = ctx.session;
        if(currentUser) {
            ctx.session = ''
        }
        return ctx.body = serverResponse.createSuccessMessage('退出登录成功')
    },

    // 登录状态下获取用户信息
    async getUserInfo(ctx) {
        let currentUser = ctx.session;
        let response;
        if(!isObjEmpty(currentUser)) {
            response = serverResponse.createSuccessMessage('获取用户信息成功', currentUser);
            return ctx.body = response;
        }
        response = serverResponse.createErrorMessage('获取登录信息失败');
        ctx.logger.debug(response);
        return ctx.body = response;
    },

    // 实时校验
    async checkValid(ctx) {
        let {checkItem, type} = ctx.request.param;
        let response;
        if(!checkItem || !type) {
            response = serverResponse.createErrorMessage('校验对象参数传递有误');
            return ctx.body = response;
        }
        return ctx.body = userService.checkValid(checkItem, type);
    }
};