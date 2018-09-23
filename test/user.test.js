const expect = require('chai').expect;
const koa = require('../app');
const request = require('supertest')(koa.listen(3000));


module.exports = function (){
    describe('user 相关测试', function () {
        it('post signIn 登录接口', function (done) {
            request.post('/api/user/signIn')
                .send({
                    name:'yanlele',
                    password: '123456'
                })
                .expect(200)
                .end(function (err, res) {
                    if(err) {
                        done(err);
                    } else {
                        console.log(res.body);
                        done();
                    }
                })
        });

        it('post singUp 登录操作', function (done) {
            request.post('/api/user/signUp')
                .send({
                    name:'yanle1123',
                    password: '123456',
                    confirmPassword: '123456',
                    email: 'yanle@qq.com'
                })
                .expect(200)
                .end(function (err, res) {
                    if(err) {
                        done(err);
                    } else {
                        console.log(res.body);
                        done();
                    }
                })
        });

        it.only('get getUserInfo', function (done) {
            request.get('/api/user/userInfo')
                .expect(200)
                .end(function (err, res) {
                    if(err) {
                        done(err)
                    } else {
                        done();
                        console.log(res.body);
                    }
                })
        });
    })
};