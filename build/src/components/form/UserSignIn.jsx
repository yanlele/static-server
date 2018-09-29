import React, {Component} from 'react';
import {Form, Icon, Input, Button, Row, Col} from 'antd';

const FormItem = Form.Item;


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UserSignIn extends Component {
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
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Username"/>
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
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password" placeholder="Password"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={22} offset={1}>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={hasErrors(getFieldsError())}
                                >
                                    Log in
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
}

export default Form.create()(UserSignIn);
