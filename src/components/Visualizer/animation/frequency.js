
class FrequencyLine {
    constructor(props) {
        this.canvas = props.canvas;
        this.fft = props.fft;
        this.ctx = this.canvas.getContext('2d');
        this.max = 255
        this.color = props.color || '#00a0dd';
        this.filledStyle = props.filled;
        this.name = props.name || 'no name...'

    }

    setCanvasSize(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;

    }
    /**
     * @param {Number} val - frequency value (from 0 yo 255) and need to be the Y position on the canvas  
     */
    calcY(val) {
        return this.height - (this.height * (val / this.max));
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
        //
        ctx.lineWidth = 2
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, this.calcY(data[0]));
        for (var i = 1; i < data.length; i++) {
            ctx.lineTo(i * step, this.calcY(data[i]));
        }

        if (this.filledStyle) {
            ctx.lineTo(width, height)
            ctx.lineTo(0, height)
            ctx.closePath();
            ctx.stroke()
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            ctx.stroke()
        }

    }

    destroy() {

    }
}

export default FrequencyLine;