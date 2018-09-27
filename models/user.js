const {query, escape} = require('./../utils/db-util');
const {checkModelResult}  = require('./../utils/index');

const userInfo = ['id' , 'username', 'password', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];

const user = {
    async checkUserName(userName) {
        let sql = `select username from mmall_user where username = ? limit 1`;
        let result = await query(sql, [userName]);
        result = checkModelResult(result);
        return result;
    },

    async checkUserByUsernameAndPassword(username, password) {
        let sql = `select ?? from mmall_user where username = ? and password = ?`;
        let result  = await query(sql, [userInfo, username, password]);
        result = checkModelResult(result);
        return result;
    }
};


module.exports = user;
