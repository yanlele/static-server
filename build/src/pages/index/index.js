import styles from './index.less';
import {Card, Row, Col} from 'antd';

export default function () {
  return (
    <div className={styles.home_background_img}>
        <Row className="pt15_ratio">
            <Col span={8} offset={8}>
                <Card
                    title="请登录"
                    style={{ width: '100%',
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
