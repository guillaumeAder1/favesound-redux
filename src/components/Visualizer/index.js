import PropTypes from 'prop-types';
import React from 'react';
import debounce from 'lodash/debounce';
import Analyzer from './analyzer'
import { connect } from 'react-redux';
// animations
import FrequencyLine from './animation/frequencyLine';
import FrequencyBar from './animation/frequencyBar';
import FrequencyCircle from './animation/frequencyCircle';




class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.audioElement = props.audio;
        this.state = {
            visualIndex: 0,
            fft: 64
        }
        this.setCanvasRef = element => {
            this.canvas = element;
            this.animations = [
                new FrequencyBar({ canvas: this.canvas, fft: this.state.fft / 2 }),
                new FrequencyLine({ canvas: this.canvas, fft: this.state.fft / 2, name: 'blue', filled: true }),
                new FrequencyLine({ canvas: this.canvas, fft: this.state.fft / 2, color: 'red', filled: true, name: 'red - filled' }),
                new FrequencyLine({ canvas: this.canvas, fft: this.state.fft / 2, color: 'lime', filled: false, name: 'lime - not filled' }),
                new FrequencyCircle({ canvas: this.canvas, fft: this.state.fft / 2, color: 'red' }),
            ]
        };
        // binding
        this.changeVisual = this.changeVisual.bind(this)

    }

    changeVisual(bool) {
        const newval = (bool) ? 1 : -1;
        const calcnewval = this.updateVisualIndex(newval)
        this.setState((prevState, props) => {
            this.setAnimation(calcnewval, false);
            return { visualIndex: calcnewval }
        });
        console.log(this.state);
    }

    updateVisualIndex(newval) {
        const val = this.state.visualIndex + newval
        if (val >= this.animations.length) {
            return 0;
        } else if (val < 0) {
            return this.animations.length - 1;
        } else {
            return val;
        }
    }

    componentDidMount() {
        window.addEventListener('resize', debounce(this.resizeCanvas.bind(this), 300));
        this.analyzer = new Analyzer({ audioPlayer: this.audioElement, fft: this.state.fft });
        this.setAnimation(this.state.visualIndex, true)

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
            <div key={1} className='player-content-action-visual'>
                <button onClick={() => this.changeVisual(false)} className="button-inline" type="button">
                    <a data-tip="Previous Visual"  >
                        <i className="fa fa-step-backward"></i>
                    </a>
                </button>
            </div>,
            <canvas key={2} ref={this.setCanvasRef} />,
            <div key={0} className='player-content-action-visual'>
                <button onClick={() => this.changeVisual(true)} className="button-inline" type="button">
                    <a data-tip="Next visual" >
                        <i className="fa fa-step-forward"></i>
                    </a>
                </button>
            </div>
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