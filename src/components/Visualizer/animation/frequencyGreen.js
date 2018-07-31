
class FrequencyBar {
    constructor(props) {
        this.canvas = props.canvas;
        this.fft = props.fft;
        this.ctx = this.canvas.getContext('2d');
        this.max = 255
        this.name = "greeen"
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
        console.log('green ')
        const { ctx, width, height } = this
        const step = width / data.length;
        // clear before redraw
        ctx.clearRect(0, 0, width, height);
        // draw bg color
        ctx.fillStyle = '#141414';
        ctx.fillRect(0, 0, width, height);
        //
        ctx.lineWidth = 2
        ctx.strokeStyle = '#248303'
        ctx.shadowColor = '#4bc720';
        ctx.shadowBlur = 100;
        // ctx.save()
        ctx.beginPath();
        ctx.moveTo(0, this.calcY(data[0]));
        for (var i = 1; i < data.length; i++) {
            ctx.lineTo(i * step, this.calcY(data[i]));
        }
        ctx.stroke()
    }

    destroy() {

    }
}

export default FrequencyBar;