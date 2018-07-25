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
        this.setCanvasRef = element => {
            this.canvas = element;
            this.animations = [
                new Frequency({ canvas: this.canvas })
            ]
            this.resizeCanvas();
        };
        this.state = {
            visual: 0,
            fft: 128
        }

    }

    componentDidMount() {
        window.addEventListener('resize', debounce(this.resizeCanvas.bind(this), 300));
        this.analyzer = new Analyzer({ audioPlayer: this.audioElement, fft: this.state.fft });
        this.visual = this.animations[this.state.visual];
        this.resizeCanvas()
        this.startDrawing();
    }

    startDrawing() {
        requestAnimationFrame(() => this.startDrawing())
        this.props.isPlaying && this.visual.draw(this.analyzer.getFrequencies())
        // setInterval(() => this.props.isPlaying && console.log(this.analyzer.getFrequencies()), 200)
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