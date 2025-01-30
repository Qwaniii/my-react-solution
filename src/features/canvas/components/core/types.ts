export type ScrollParams = {
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
};

export type ZoomParams = {
  center: Point;
  zoom?: number;
  delta?: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Rect = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type Figure = {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
    time: number;
    pause: boolean;
  
}

export type Action = {
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  element?: Figure;
};