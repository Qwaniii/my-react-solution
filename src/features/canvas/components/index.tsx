import React, { useEffect, useMemo, useRef, useState } from 'react';
import Core from './core';
import './style.less';
import { Events, State } from 'react-solution';
import Figure from './core/elements';
import Circle from './core/elements/arc';
import Triangle from './core/elements/tre';
import Line from './core/elements/line';

function Draw( {elements}: any) {
  const dom = useRef<any>(null);
  // const core = useMemo(() => {
  //   return new Core(elements);
  // }, [elements]);

  // console.log(elements)

  // useEffect(() => {
  //   if (dom.current) core?.mount(dom.current);
  //   return () => core?.unmount();
  // }, [elements]);

  const widthCanvas = 600
  const heightCanvas = 600

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [list, setList] = useState<any>([])

  const canvas = dom.current;
  const context = canvas?.getContext('2d');
  const size = canvas?.getBoundingClientRect()


  useEffect(() => {
    if(canvas) {
      // context.translate(offset.x, offset.y);
      // context.scale(scale, scale);
      setList(list.map((figure: any) => figure = {...figure, x : figure.x * scale, y : figure.y * scale}))
    }
  }, [scale, offset]);

  const handleWheel = (event: any) => {
    event.preventDefault();
    const scaleAmount = event.deltaY > 0 ? 0.9 : 1.1;
    setScale(prevScale => Math.min(Math.max(prevScale * scaleAmount, 0.5), 5));
  };

  const handleMouseClick = (event: any) => {
    if(elements.type === 'rectangle') {
      const rect = new Figure(event.clientX - size.left, event.clientY - size.top, elements.width, elements.height, elements.color)
      context.save();
      rect.draw(context)
      context.restore();
      setList((prevState: any) => [...prevState, rect])

    }
    else if(elements.type === 'arc') {
      const arc = new Circle(elements.radius, elements.start, elements.end, event.clientX - size.left, event.clientY - size.top, elements.color)
      context.save();
      arc.draw(context)
      context.restore();
      setList((prevState: any) => [...prevState, arc])

    }
    else if(elements.type === 'tre') {
      const tre = new Triangle(elements.line, event.clientX - size.left, event.clientY - size.top, elements.color)
      context.save();
      tre.draw(context)
      context.restore();
      setList((prevState: any) => [...prevState, tre])

    }
  }

  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    // setLastMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: any) => {
    if (isDragging) {
    // const dx = event.clientX - lastMousePos.x;
    // const dy = event.clientY - lastMousePos.y;
    // setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    // setLastMousePos({ x: event.clientX, y: event.clientY });
    if (elements.type === 'line') {
      const line = new Line(elements.radius, elements.start, elements.end, event.clientX - size.left, event.clientY - size.top, elements.color)
      context.save();
      line.draw(context)
      context.restore();
      setList((prevState: any) => [...prevState, line])
    }
  }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    context.beginPath()
  };

  console.log(list)

  return     <canvas
                ref={dom}
                width={widthCanvas}
                height={heightCanvas}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleMouseClick}
                style={{ border: '1px solid black' }}
            />;
}

export default React.memo(Draw);