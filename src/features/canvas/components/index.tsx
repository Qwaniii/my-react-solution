import React, { useEffect, useMemo, useRef } from 'react';
import Core from './core';
import './style.less';

function Draw( {elements}: any) {
  const dom = useRef<HTMLDivElement>(null);
  const core = useMemo(() => {
    return new Core(elements);
  }, [elements]);

  useEffect(() => {
    if (dom.current) core?.mount(dom.current);
    return () => core?.unmount();
  }, []);

  return <div className="Draw" ref={dom} />;
}

export default React.memo(Draw);