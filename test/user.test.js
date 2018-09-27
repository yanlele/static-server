const expect = require('chai').expect;
const koa = require('../app');
const request = require('supertest')(koa.listen(3001));

module.exports = function() {
    describe('用户模块的测试', function() {
        it('注册模块', function (done) {
            request.post('/api/user/singUp')
                .send({
                    username: 'yanle',
                    password: 123456,
                    confirmPassword: 123456,
                    email: '331393627@qq.com'
                })
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        done(err);
                    } else {
                        console.log(res.body);
                    }
                })
        });
    })
};