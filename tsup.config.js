import { defineConfig } from 'tsup';
export default defineConfig([
  {
    entry: ['src/index.js'],
    outDir: 'dist',
    format: ['cjs', 'esm'],
  },
  {
    entry: { index: 'src/react/index.jsx' },
    outDir: 'dist/react',
    format: ['cjs', 'esm'],
    external: ['react', 'react-dom'],
  },
]);