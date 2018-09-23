const expect = require('chai').expect;
const koa = require('../app');
const requestKoa = require('supertest')(koa.listen(3000));


describe('koa service', function () {
    it('检测一个get请求', function (done) {
        requestKoa
            .get('/home')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                console.log(res.body);
                expect(res.body).is.a('object');
                done();
            })
    });
});