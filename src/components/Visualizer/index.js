import PropTypes from 'prop-types';
import React from 'react';


class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.audioElement = props.audio;
        this.setCanvasRef = element => {
            this.canvas = element;
            this.resizeCanvas()
        };
        // this.resizeCanvas();
    }
    resizeCanvas() {
        // Make it visually fill the positioned parent
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        // ...then set the internal size to match
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