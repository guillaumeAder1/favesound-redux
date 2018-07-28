import PropTypes from 'prop-types';
import React from 'react';
import debounce from 'lodash/debounce';
import Analyzer from './analyzer'
import { connect } from 'react-redux';
// load animations
import Frequency from './animation/frequency';




class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.audioElement = props.audio;
        this.state = {
            visual: 0,
            fft: 128
        }
        this.setCanvasRef = element => {
            this.canvas = element;
            this.animations = [
                new Frequency({ canvas: this.canvas, fft: (this.state.fft / 2) - 1 })
            ]
        };


    }

    componentDidMount() {
        window.addEventListener('resize', debounce(this.resizeCanvas.bind(this), 300));
        this.analyzer = new Analyzer({ audioPlayer: this.audioElement, fft: this.state.fft });
        this.visual = this.animations[this.state.visual];
        setTimeout(() => {
            this.resizeCanvas()
            this.startDrawing();
        }, 500);
    }

    startDrawing() {
        requestAnimationFrame(() => this.startDrawing())
        this.props.isPlaying && this.visual.draw(this.analyzer.getFrequencies())
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCanvas.bind(this));
    }

    resizeCanvas() {
        // Make it visually fill the positioned parent
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.visual.setCanvasSize(this.canvas)
    }

    render() {
        return (
            <canvas ref={this.setCanvasRef} />
        )
    }
}

Visualizer.propTypes = {
    audio: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool,

};

function mapStateToProps(state) {
    return {
        isPlaying: state.player.isPlaying,
    };
}

export default connect(mapStateToProps, null)(Visualizer);