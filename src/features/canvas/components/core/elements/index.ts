import { Rect } from "../types";

class Figure {
  x: number = 0;
  y: number = 0;
  width: number = 10;
  height: number = 10;
  color: string = 'black'
  dx?: number;
  dy: number

  constructor(x: number = 0, y: number = 0, width: number = 10, height: number = 10, color: string = 'black', dx?: number, dy: number = 1) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color
    this.dx = dx 
    this.dy = dy
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Добавление трансформации поворота
    // Смещение origin в центр фигуры
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // Возвращаем origin обратно
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    // Rect
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }

  update(ctx: CanvasRenderingContext2D, dy: number, height: number) {

        if (this.y + this.height >= height) {
            // this.dy = -this.dy
            this.y = height - this.height
        }
          // Обновление позиции
            this.y += this.dy
            
          // Отрисовка 
          this.draw(ctx);
      
  }

}

export default Figure;