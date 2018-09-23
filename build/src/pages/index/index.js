import styles from './index.less';
import {Card, Row, Col} from 'antd';
import {Component} from 'react';
import {connect} from 'dva';

function mapStateToProps(state) {
    return {
        login: state.global.login,
        name: state.global.name,
        text: state.global.text,
    };
}

class Index extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <div className={styles.home_background_img}>
                <Row className="pt15_ratio">
                    <Col span={10} offset={7}>
                        <Card
                            title="请登录"
                            style={{
                                width: '100%',
                            }}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Index);
