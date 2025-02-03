import { Rect } from "../types";

class Figure {
  x: number = 0;
  y: number = 0;
  width: number = 10;
  height: number = 10;
  color: string = 'black'

  constructor(x: number = 0, y: number = 0, width: number = 10, height: number = 10, color: string = 'black') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color
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

}

export default Figure;