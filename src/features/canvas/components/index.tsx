import React, { useEffect, useMemo, useRef } from 'react';
import Core from './core';
import './style.less';
import Figure from './core/elements';

function Draw( {element}: any) {
    console.log(element)
  const dom = useRef<HTMLDivElement>(null);
  const core = useMemo(() => {
    return new Core(element);
  }, [element]);

  useEffect(() => {
    if (dom.current) core?.mount(dom.current);
    return () => core?.unmount();
  }, [element]);

  return <div className="Draw" ref={dom} />;
}

export default React.memo(Draw);