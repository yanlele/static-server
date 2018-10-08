let {isObjEmpty} = require('./index');
let serverResponse = require('./serverResponse');

class ControllerUtil {
    // 验证当前用户名是否为登录的用户名
    static checkLoginUsername(currentUser, username) {
        if(isObjEmpty(currentUser)) {
            return serverResponse.createErrorMessage('当前用户没有登录，请重新登录');
        }
        if(username !== currentUser.username) {
            return serverResponse.createErrorMessage('当前用户名并非登陆者本人');
        }

        return serverResponse.createSuccessMessage('校验成功');
    }

    static checkLogin(currentUser) {
        if(isObjEmpty(currentUser)) {
            return serverResponse.createErrorMessage('当前用户没有登录，请重新登录');
        }
        return serverResponse.createSuccessMessage('校验成功');
    }
}


module.exports = ControllerUtil;