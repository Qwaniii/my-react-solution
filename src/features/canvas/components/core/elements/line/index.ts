import Figure from "..";

class Line extends Figure {
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
        ctx.lineWidth = this.radius * 2
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color

        ctx.lineTo(this.x, this.y)

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, this.start, this.end)
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)



    }
}

export default Line