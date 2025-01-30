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

  setPosition({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  /**
   * Прямоугольная область элемента
   */
  getBoundRect(): Rect {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + this.width,
      y2: this.y + this.height,
    };
  }

  /**
   * Проверка попадания элемента в прямоугольную область
   * @param rect
   */
  isIntersectRect(rect: Rect) {
    const bound = this.getBoundRect();
    return bound.x1 <= rect.x2 && bound.x2 >= rect.x1 && bound.y1 <= rect.y2 && bound.y2 >= rect.y1;
  }

  get zIndex() {
    return 0;
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

  drawArc(ctx: CanvasRenderingContext2D) {
    
    // Добавление трансформации поворота
    // Смещение origin в центр фигуры
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // Возвращаем origin обратно
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    // Rect
    ctx.fillStyle = this.color;
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.width, this.height, this.x + 360);
    ctx.fill()
  }

  drawTre(ctx: CanvasRenderingContext2D) {
    
    // Добавление трансформации поворота
    // Смещение origin в центр фигуры
    ctx.translate(this.x, this.y);
    // Возвращаем origin обратно
    ctx.translate(-(this.x), -(this.y));
    // Rect
    ctx.fillStyle = this.color;
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.x - this.height);
    ctx.lineTo(this.y,  this.x - this.width);
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }


}

export default Figure;