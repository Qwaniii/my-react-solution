import Figure from "..";

class Triangle extends Figure {
    line: number = 10


    constructor(line: number = 10, x: number = 10, y: number = 10, color: string = 'black', dx: number, dy: number) {
        super(x, y, 0, 0, color, dx, dy)
        this.line = line
    }

    override draw(ctx: CanvasRenderingContext2D): void {
    
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.line);
        ctx.lineTo(this.x  - this.line, this.y);
        ctx.lineTo(this.x + this.line, this.y);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

export default Triangle