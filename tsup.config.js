import { defineConfig } from 'tsup';
import Icons from 'unplugin-icons/esbuild';

export default defineConfig({
  entry: { index: 'src/index.jsx' },
  outDir: 'dist',
  format: ['cjs', 'esm'],
  external: ['react', 'react-dom'],
  esbuildPlugins: [
    Icons({ compiler: 'jsx', jsx: 'react' }),
  ],
});