class Analyzer {

    constructor(props) {

        this.createAnalyzer(props.audioPlayer)
    }



    /**
     * 
     * @param {HTML5 Audio Element} player - audio element playing the song
     */
    createAnalyzer(player) {
        let context = new (window.AudioContext || window.webkitAudioContext)();
        let source = context.createMediaElementSource(player);
        this.analyser = context.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);
        this.analyser.connect(context.destination);
        this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);
        //return this.analyser.getByteFrequencyData(this.frequencies)
    }

    getFrequencies() {
        //if (this.isPlaying) {
        this.analyser.getByteFrequencyData(this.frequencies);
        return this.frequencies
        //}
    }



}

export default Analyzer;