class Analyzer {

    constructor(props) {

        this.createAnalyzer(props.audioPlayer, props.fft)
    }



    /**
     * 
     * @param {HTML5 Audio Element} player - audio element playing the song
     */
    createAnalyzer(player, fft = 64) {
        let context = new (window.AudioContext || window.webkitAudioContext)();
        let source = context.createMediaElementSource(player);
        this.analyser = context.createAnalyser();
        this.analyser.fftSize = fft;
        source.connect(this.analyser);
        this.analyser.connect(context.destination);
        this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);
    }

    getFrequencies() {
        this.analyser.getByteFrequencyData(this.frequencies);
        return this.frequencies
    }



}

export default Analyzer;