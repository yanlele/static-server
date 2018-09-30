const serverResponse = require('./../utils/serverResponse');
const userModel = require('./../models/user');

class UserService {
    static async signIn(username, password) {
        let response;
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

        response = serverResponse.createSuccessMessage('登录成功', userInfo);

        return response;
    }

    static async signUp(username, password, confirmPassword, email) {
        if(!username) {
            return serverResponse.createErrorMessage('没有传入用户名');
        }
        if(!password) {
            return serverResponse.createErrorMessage('没有传入密码');
        }
        if(!confirmPassword) {
            return serverResponse.createErrorMessage('没有传入确认密码');
        }
        if(password!==confirmPassword) {
            return serverResponse.createErrorMessage('密码和确认密码不一致');
        }

        // 验证用户名是否正确
        let userInfo = await userModel.checkUserName(username);
        if(userInfo) {
            return serverResponse.createErrorMessage('用户名已经存在');
        }

        // 存入数据库
        let responseCount =await userModel.insertUserInfo(username, password, email);
        if(responseCount.affectedRows > 0) {
            return serverResponse.createSuccessMessage('用户注册成功');
        }
        return serverResponse.createErrorMessage("注册失败");
    }

    // 实时校验检测业务逻辑
    static async checkValid(checkItem ,type) {
        let responseCount;
        if(type === 'username') {
            responseCount = await userModel.checkUserName(checkItem);
        }
        if(type === 'email') {
            responseCount = await userModel.checkUserEmail(checkItem);
        }

        if(!responseCount) {
            return serverResponse.createErrorMessage('验证失败');
        }

        return serverResponse.createSuccessMessage('验证成功');
    }

    // 通过用户名获取问题 用户名是唯一的
    static async selectQuestion(username) {
        let responseCount = this.checkValid(username, 'username');
        if(!responseCount) {
            return serverResponse.createErrorMessage('用户名不存在');
        }
        let question = userModel.selectQuestionByUsername(username);
        if(question!==null && question!== '') {
            return serverResponse.createSuccessMessage('查询问题成功', question);
        }
        return serverResponse.createErrorMessage('找回密码的为是空的');
    }
}


module.exports = UserService;