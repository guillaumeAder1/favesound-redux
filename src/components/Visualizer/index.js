import PropTypes from 'prop-types';
import React from 'react';
import debounce from 'lodash/debounce';
import Analyzer from './analyzer'
import { connect } from 'react-redux';
// load animations
import Frequency from './animation/frequency';
import FrequencyGreen from './animation/frequencyGreen';




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
                new Frequency({ canvas: this.canvas, fft: this.state.fft / 2 }),
                new FrequencyGreen({ canvas: this.canvas, fft: this.state.fft / 2 })
            ]
        };
        // binding
        this.changeVisual = this.changeVisual.bind(this)

    }

    changeVisual(bool) {
        const newval = (bool) ? 1 : -1;
        this.setState((prevState, props) => {
            this.setAnimation(this.state.visual + newval, false)

            return { visual: prevState.visual + newval }
        });
        console.log(this.state)

        // this.visual.destroy()

    }

    componentDidMount() {
        window.addEventListener('resize', debounce(this.resizeCanvas.bind(this), 300));
        this.analyzer = new Analyzer({ audioPlayer: this.audioElement, fft: this.state.fft });
        this.setAnimation(this.state.visual, true)

    }

    setAnimation(index, init) {
        this.visual = this.animations[index];
        setTimeout(() => {
            this.resizeCanvas()
            init && this.startDrawing();
        }, 100);
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
        return [
            <button key={1} onClick={() => this.changeVisual(false)} className="button-inline" type="button">
                <a data-tip="Previous Visual"  >
                    <i className="fa fa-step-backward"></i>
                </a>
            </button>,
            <button key={0} onClick={() => this.changeVisual(true)} className="button-inline" type="button">
                <a data-tip="Next visual" >
                    <i className="fa fa-step-forward"></i>
                </a>
            </button>,

            <canvas key={2} ref={this.setCanvasRef} />
        ]
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