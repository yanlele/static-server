import React, {Component} from 'react';
import {Button, Row, Input, message} from 'antd';

import {signIn} from '../../common/api/api_test';
const TextArea = Input.TextArea;


class ApiTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <div className="p-l-hg p-t-hg">
                <Row>
                    <Button onClick={this.handleSignIn}>
                        用户登录
                    </Button>
                </Row>

                <br/>
                <Row>
                    <TextArea
                        autosize={{minRows: 10}}
                        value={this.state.value}/>
                </Row>
            </div>
        );
    }

    handleSignIn() {
        signIn('/api/user/signIn/', {
            name: 'yanle',
            password: '123456'
        }, 'post').then((res) => {
            let response = res.data;
            if(response.success) {
                this.setState({
                    value: response.data
                });
                message.success(response.message);
            }
        }).catch(err =>{
            message.error(err.message);
        });
    }
}

export default ApiTest;
