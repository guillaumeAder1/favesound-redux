
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
        const res = ((this.height - 10) * percent);
        return res
    }
    calcX(val) {
        const percent = val / this.max;
        const res = ((this.width - 10) / 2 * percent);
        return res
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
        //console.log("origin", orgX, orgY, "size", width, height)
        const t = true

        // center circle
        // ctx.beginPath();
        // ctx.arc(width / 2, height / 2, 5, 0, Math.PI * 2)
        // ctx.fillStyle = 'red';
        // ctx.fill();

        for (var i = 0; i < data.length; i++) {
            const angle = (i / (numNode / 2)) * Math.PI;
            // const dx = orgX + ((radius + data[i]) * Math.cos(angle))
            // const dy = orgY + ((radius + data[i]) * Math.sin(angle))


            const dx = orgX + ((this.calcX(radius + data[i])) * Math.cos(angle))
            const dy = orgY + ((this.calcY(radius + data[i])) * Math.sin(angle))

            // const X = this.calcX(dx)
            // const Y = this.calcY(dy)

            // //console.log("value", data[i], "destx", dx, "desty", dy)
            // console.log("this.calcX", X)
            // console.log("this.calcY", Y)

            //ctx.clearRect(0, 0, width, height);


            ctx.beginPath();
            //ctx.arc(X, Y, 5, 0, Math.PI * 2)
            ctx.arc(dx, dy, 5, 0, Math.PI * 2)
            ctx.fillStyle = 'green';
            ctx.fill();
        }

    }
    destroy() {

    }
}

export default FrequencyCircle;