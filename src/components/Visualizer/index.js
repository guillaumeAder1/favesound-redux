import PropTypes from 'prop-types';
import React from 'react';
import debounce from 'lodash-es';


class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.audioElement = props.audio;
        this.setCanvasRef = element => {
            this.canvas = element;
            this.resizeCanvas()
        };
        // document.body.addEventListener('resize', debounce(this.resizeCanvas, 300));
    }
    resizeCanvas() {
        // Make it visually fill the positioned parent
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    render() {
        return (
            <canvas ref={this.setCanvasRef} />
        )
    }
}

export default Visualizer;