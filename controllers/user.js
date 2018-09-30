const {isObjEmpty} = require('../build/src/util/tool');
const userService = require('../services/user');
const userCode = require('../enums/user');
const serverResponse = require('../utils/serverResponse');
const {checkLoginUsername} = require('../utils/controllerUtil');

class UserController {
    // 登录接口
    static async signIn(ctx) {
        let {username, password} = ctx.request.body;
        let response = await userService.signIn(username, password);
        // 直接存session
        if(response.success) {
            ctx.session = response.data;
        }
        return ctx.body = response;
    }


    // 退出登录
    static async signOut(ctx) {
        let currentUser = ctx.session;
        if(currentUser) {
            ctx.session = ''
        }
        return ctx.body = serverResponse.createSuccessMessage('退出登录成功')
    }


    // 注册接口
    static async signUp(ctx) {
        let {username, password, confirmPassword, email} = ctx.request.body;
        return ctx.body = await userService.signUp(username, password, confirmPassword, email);
    }


    // 实时校验
    static async checkValid(ctx) {
        let {checkItem, type} = ctx.request.query;
        let response;
        if(!checkItem || !type) {
            response = serverResponse.createErrorMessage('校验对象参数传递有误');
            return ctx.body = response;
        }
        return ctx.body =await userService.checkValid(checkItem, type);
    }


    // 登录状态下获取用户信息
    static async getUserInfo(ctx) {
        let currentUser = ctx.session;
        let response;
        if(!isObjEmpty(currentUser)) {
            response = serverResponse.createSuccessMessage('获取用户信息成功', currentUser);
            return ctx.body = response;
        }
        response = serverResponse.createErrorMessage('获取登录信息失败');
        ctx.logger.debug(response);
        return ctx.body = response;
    }


    // 忘记密码 获取问题
    static async forgetGetQuestion(ctx) {
        let {username} = ctx.request.query;
        if(!username) {
            return ctx.body = serverResponse.createErrorMessage('错误的用户名信息')
        }
        return ctx.body =await userService.selectQuestion(username);
    }

    // 验证问题答案 ， 如果问题答案通过给一个全局唯一识别码
    static async forgetCheckAnswer(ctx) {
        let {username, question, answer} = ctx.request.query;
        if(!username && !question && !answer) {
            return ctx.body = serverResponse.createErrorMessage('传递参数错误');
        }
        let response =await userService.checkAnswer(username, question, answer);


        // 验证登录是否失效
        let currentUser = ctx.session;
        if(isObjEmpty(currentUser)) {
            return ctx.body = serverResponse.createErrorMessage('当前登录用户失效， 请重新登录')
        }
        // 如果返回正确
        if(response.success) {
            // 在session 中保存 forgetToken;
            Object.assign(currentUser,  {
                forgetToken: response.forgetToken
            });
            ctx.session = currentUser;
        }
        // 返回 forgetToken
        return ctx.body = response;
    }

    // 通过拿到的token重置密码
    static async forgetRestPassword(ctx) {
        let {username, passwordNew, forgetToken} = ctx.request.body;
        let currentUser = ctx.session;
        let checkLoginUsername = checkLoginUsername(currentUser, username);
        if(!username && !passwordNew && !forgetToken) {
            return ctx.body =  serverResponse.createErrorMessage('传递参数错误');
        }
        if(!checkLoginUsername.success) {
            return checkLoginUsername;
        }
        if(forgetToken !== currentUser.forgetToken) {
            return ctx.body = serverResponse.createErrorMessage('忘记密码的token验证错误');
        }

        // 如果以上验证都通过了，可以允许修改密码了 因为username 是唯一标志，可以就那username去修改。

    }
}

module.exports = UserController;