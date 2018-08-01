
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
        const percent = val / this.max;
        return ((this.height) * percent);
    }
    calcX(val) {
        const percent = val / this.max;
        return ((this.width) / 2 * percent);
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
        const radius = 15;
        const reducer = 8

        for (var i = 0; i < data.length; i++) {
            const angle = (i / (numNode / 2)) * Math.PI;
            const dx = orgX + ((radius + data[i]) * Math.cos(angle))
            const dy = orgY + ((radius + data[i]) * Math.sin(angle))

            // console.log(data[i], ' - ', dx, ' / ', dy)
            // const dx = orgX + ((radius) * Math.cos(angle))
            // const dy = orgY + ((radius) * Math.sin(angle))
            ctx.beginPath();
            ctx.arc(this.calcX(dx), this.calcY(dy), 5, 0, Math.PI * 2)
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.stroke();
        }

    }
    destroy() {

    }
}

export default FrequencyCircle;