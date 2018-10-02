const userInfoService = require('./../services/user-info')
const userCode = require('./../enums/user')

module.exports = {


    async setSession(ctx) {
        let session = ctx.session;
        let test = {
            name: 'yanle',
            age: 25
        };
        session =  test
        return ctx.body = {
            message: '成功'
        }
    },


    async getSession(ctx) {
        let session = ctx.session;
        return ctx.body = session;
    },



    /**
     * 登录操作
     * @param  {obejct} ctx 上下文对象
     */
    async signIn(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        };

        // 第一步，查询数据库中有没有当前的用户
        let userResult = await userInfoService.signIn(formData);
        console.log(userResult);

        if (userResult) {
            if (formData.name === userResult.name) {
                result.success = true
            } else {
                result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
                result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
            }
        } else {
            result.code = 'FAIL_USER_NO_EXIST';
            result.message = userCode.FAIL_USER_NO_EXIST
        }

        console.log(formData);
        console.log(result.success);

        if (result.success === true) {
            let session = ctx.session;
            session.isLogin = true;
            session.userName = userResult.name;
            session.userId = userResult.id;
        }
        ctx.body = result;
    },

    /**
     * 注册操作
     * @param   {obejct} ctx 上下文对象
     */
    async signUp(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null
        }


        let validateResult = userInfoService.validatorSignUp(formData)

        // 如果注册信息不合规 直接退出注册
        if (validateResult.success === false) {
            result = validateResult
            ctx.body = result
            return
        }

        // 验证信息是否存在
        let existOne = await userInfoService.getExistOne(formData)
        console.log(existOne)

        if (existOne) {
            if (existOne.name === formData.name) {
                result.message = userCode.FAIL_USER_NAME_IS_EXIST
                ctx.body = result
                return
            }
            if (existOne.email === formData.email) {
                result.message = userCode.FAIL_EMAIL_IS_EXIST
                ctx.body = result
                return
            }
        }


        let userResult = await userInfoService.create({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            level: 1,
        });

        console.log(userResult)

        if (userResult && userResult.insertId * 1 > 0) {
            result.success = true
            result.message = '注册成功'
        } else {
            result.message = userCode.ERROR_SYS
        }

        ctx.body = result
    },

    /**
     * 获取用户信息
     * @param    {obejct} ctx 上下文对象
     */
    async getLoginUserInfo(ctx) {
        let session = ctx.session
        let isLogin = session.isLogin
        let userName = session.userName

        console.log('session=', session)

        let result = {
            success: false,
            message: '',
            data: null,
        }
        if (isLogin === true && userName) {
            let userInfo = await userInfoService.getUserInfoByUserName(userName)
            if (userInfo) {
                result.data = userInfo
                result.success = true
            } else {
                result.message = userCode.FAIL_USER_NO_LOGIN
            }
        } else {
            // TODO
        }

        ctx.body = result
    },

    /**
     * 校验用户是否登录
     * @param  {obejct} ctx 上下文对象
     */
    validateLogin(ctx) {
        let result = {
            success: false,
            message: userCode.FAIL_USER_NO_LOGIN,
            data: null,
            code: 'FAIL_USER_NO_LOGIN',
        }
        let session = ctx.session
        if (session && session.isLogin === true) {
            result.success = true
            result.message = ''
            result.code = ''
        }
        return result
    }
}