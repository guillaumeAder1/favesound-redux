
class Frequency {
    constructor(props) {
        this.canvas = props.canvas;
<<<<<<< HEAD
        this.fft = props.fft
=======
        this.fft = props.fft;
>>>>>>> c217c68dcab6ffc868ebf525544935c8f4f45b3a
        this.ctx = this.canvas.getContext('2d');
        this.max = 255
    }

    setCanvasSize(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;

    }
    calcY(val) {
        const perc = val / this.max;
        return this.height - (this.height * perc);
    }
    draw(data) {
        const { ctx, width, height } = this
        const step = width / data.length;
        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 2
        ctx.strokeStyle = '#00a0dd'
        ctx.shadowColor = '#70c5e5';
        ctx.shadowBlur = 100;
        ctx.clearRect(0, 0, width, height);
        ctx.save()
        ctx.beginPath();
        ctx.moveTo(0, this.calcY(data[0]));
        for (var i = 1; i < data.length; i++) {
            ctx.lineTo(i * step, this.calcY(data[i]));
        }
        ctx.stroke()
    }
}

export default Frequency;