import React, {Component} from 'react';
import {Form, Icon, Input, Button, Row, Col} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UserSignIn extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className="app-user-signIn-form">
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={22} offset={1}>
                            <FormItem
                                validateStatus={userNameError ? 'error' : ''}
                                help={userNameError || ''}
                            >
                                {getFieldDecorator('userName', {
                                    rules: [{required: true, message: '用输入用户名!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={22} offset={1}>
                            <FormItem
                                validateStatus={passwordError ? 'error' : ''}
                                help={passwordError || ''}
                            >
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password" placeholder="密码"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={22}
                            offset={1}
                            className="text-right"
                        >
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={hasErrors(getFieldsError())}
                                >
                                    登录
                                </Button>


                                <Button
                                    className="m-l-lg"
                                >
                                    注册
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.form.validateFields((err) => {
            if (!err) {
                // console.log(values);
            }
        });
    }
}

UserSignIn.propTypes = {
    form: PropTypes.obj
};

export default Form.create()(UserSignIn);
