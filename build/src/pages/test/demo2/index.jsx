import React from 'react';
import {StaggeredMotion, spring, presets} from 'react-motion';
import style from './index.less';

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x: 250, y: 300};
    };

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('touchmove', this.handleTouchMove);
    };

    handleMouseMove = ({pageX: x, pageY: y}) => {
        this.setState({x, y});
    };

    handleTouchMove = ({touches}) => {
        this.handleMouseMove(touches[0]);
    };

    getStyles = (prevStyles) => {
        // `prevStyles` is the interpolated value of the last tick
        const endValue = prevStyles.map((_, i) => {
            return i === 0
                ? this.state
                : {
                    x: spring(prevStyles[i - 1].x, presets.gentle),
                    y: spring(prevStyles[i - 1].y, presets.gentle),
                };
        });
        return endValue;
    };

    render() {
        return (
            <StaggeredMotion
                defaultStyles={[1, 2, 3, 4, 5, 6].map(() => ({x: 0, y: 0}))}
                styles={this.getStyles}>
                {balls =>
                    <div className={style.demo1}>
                        {balls.map(({x, y}, i) => {
                            let ball_index = style['ball_'+i];
                                return <div
                                    key={i}
                                    className={`${style.demo1_ball} ${ball_index}`}
                                    style={{
                                        WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                                        transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                                        zIndex: balls.length - i,
                                    }}/>
                            }
                        )}
                    </div>
                }
            </StaggeredMotion>
        );
    };
}
