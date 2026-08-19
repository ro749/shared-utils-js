import Form from './forms/Form';
import Table from './tables/Table';
import { createRoot } from 'react-dom/client';
import React from 'react';
const registry = {
  'form': Form,
  'table': Table,
};

export function mount(el, name, config) {
  console.log(name);
  const Component = registry[name];
  const root = createRoot(el);
  root.render(<Component {...config} />);
  el.removeAttribute('data-config');
  el.removeAttribute('data-widget');

  return () => root.unmount();
}