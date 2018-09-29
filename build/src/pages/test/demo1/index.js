import React from "react";
import {Motion, spring} from "react-motion";
import style from './index.less';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    };

    handleMouseDown = () => {
        this.setState({open: !this.state.open});
    };

    handleTouchStart = (e) => {
        e.preventDefault();
        this.handleMouseDown();
    };

    render() {
        return (
            <div>
                <button
                    onMouseDown={this.handleMouseDown}
                    onTouchStart={this.handleTouchStart}>
                    Toggle
                </button>

                <Motion style={{x: spring(this.state.open ? 400 : 0), y: spring(this.state.open ? 400 : 0)}}>
                    {({x, y}) =>
                        <div className={`${style.demo0} ${style.demo0_box}`}>
                            <div className={style.demo0_block} style={{
                                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                transform: `translate3d(${x}px, ${y}px, 0)`,
                            }} />
                        </div>
                    }
                </Motion>
            </div>
        );
    };
}
