const {query, escape} = require('./../utils/db-util');
const {checkModelResult}  = require('./../utils/index');

const userInfo = ['id' , 'username', 'password', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];

class User {
    static async checkUserName(userName) {
        let sql = `select count(1) from mmall_user where username = ? limit 1`;
        return await query(sql, [userName]);
    }

    static async checkUserByUsernameAndPassword(username, password) {
        let sql = `select ?? from mmall_user where username = ? and password = ?`;
        let result  = await query(sql, [userInfo, username, password]);
        result = checkModelResult(result);
        return result;
    }

    static async insertUserInfo(username, password, email) {
        let sql = `insert into mmall_user set ?`;
        let param = {username, password, email};
        Object.assign(param, {
            role: 1,
            update_time: new Date(),
            create_time: new Date()
        });
        return await query(sql, param);
    }


    // 验证邮箱的正确性
    static async checkUserEmail (email) {
        let sql = `select count(1) from where email=?`;
        return await query(sql, [email]);
    }

    // 通过用户名查询问题
    static async selectQuestionByUsername(username) {
        let sql = `select question from mmall_user where username=?`;
        let result =await query(sql, [username]);
        result = checkModelResult(result);
        return result;
    }

    // 验证答案的正确性
    static async checkAnswer(username, question, answer) {
        let sql = `select count(1) from mmall_user where username=? and question=? and answer=?`;
        return await query(sql, [username, question, answer]);
    }

    // 更新用户密码
    static async updatePasswordByUsername(username, password) {
        let sql = `update mmall_user set password=? where username = ?`;
        return await query(sql, [username, password]);
    }
}


module.exports = User;
