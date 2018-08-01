
class FrequencyCircle {
    constructor(props) {
        this.canvas = props.canvas;
        this.fft = props.fft;
        this.ctx = this.canvas.getContext('2d');
        this.max = 255
        this.color = props.color || '#00a0dd';
        this.filledStyle = props.filled;
        this.name = props.name || '..Circle..'
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
        console.log(this.name)
        const { ctx, width, height } = this
        const step = width / data.length;
        // clear before redraw
        ctx.clearRect(0, 0, width, height);
        // draw bg color
        ctx.fillStyle = '#141414';
        ctx.fillRect(0, 0, width, height);

        const orgX = width / 2
        const orgY = height / 2;
        const numNode = data.length;
        const radius = 25;
        const reducer = 10

        for (var i = 0; i < data.length; i++) {
            const angle = (i / (numNode / 2)) * Math.PI;
            const dx = orgX + ((radius + data[i] / reducer) * Math.cos(angle))
            const dy = orgY + ((radius + data[i] / reducer) * Math.sin(angle))

            ctx.beginPath();
            ctx.arc(dx, dy, 5, 0, Math.PI * 2)
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.stroke();
        }

    }
    destroy() {

    }
}

export default FrequencyCircle;