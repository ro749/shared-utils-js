import Input from './forms/Input';
import Form from './forms/Form';
import { createRoot } from 'react-dom/client';
import React from 'react';
const registry = {
  'input': Input,
  'form': Form,
};

export function mount(el, name, config) {
  const Component = registry[name];
  const root = createRoot(el);
  root.render(<Component {...config} />);
  return () => root.unmount();
}