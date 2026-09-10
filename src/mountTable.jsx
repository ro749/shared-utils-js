import Table from './tables/Table';
import { createRoot } from 'react-dom/client';
import React from 'react';

export function mountTable(el, config) {
  const root = createRoot(el);
  root.render(<Table {...config} />);
  el.removeAttribute('data-config');

  return () => root.unmount();
}