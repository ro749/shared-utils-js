import Form from './forms/Form';
import { createRoot } from 'react-dom/client';
import React from 'react';

export function mountForm(el, config) {
  const root = createRoot(el);
  root.render(<Form {...config} />);
  el.removeAttribute('data-config');

  return () => root.unmount();
}