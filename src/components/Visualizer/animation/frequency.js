
class Frequency {
    constructor(props) {
        this.canvas = props.canvas;
        this.fft = props.fft
        this.ctx = this.canvas.getContext('2d');
    }

    setCanvasSize(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
    }

    draw(data) {
        console.log(data)
        const len = data.length;
        const step = this.width / len;
        const { ctx } = this
        ctx.fillStyle = 'blue';
        ctx.fillRect(10, 10, 100, 100);
        // ctx.beginPath();
        // ctx.strokeStyle = 'blue';
        // ctx.moveTo(20, 20);
        // ctx.lineTo(120, 120);
        // ctx.stroke();
        data.forEach((e, i) => {

        })
    }
}

export default Frequency;