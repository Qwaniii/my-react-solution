import Figure from "..";

class Circle extends Figure {
    radius: number = 10
    start: number = 0
    end: number = Math.PI * 2

    constructor(radius: number = 10, start: number = 0, end: number = Math.PI * 2, x: number = 10, y: number = 10, color: string = 'black') {
        super(x, y, 0, 0, color)
        this.radius = radius
        this.start = start 
        this.end = end
    }

    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath(); 
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, this.start, this.end);
        ctx.fill();
        ctx.closePath();
    }
}

export default Circle