import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Get all HTML files in the example directory
const exampleFiles = fs.readdirSync('./example')
  .filter(file => file.endsWith('.html'))
  .reduce((acc, file) => {
    acc[file.replace('.html', '')] = resolve(__dirname, 'example', file);
    return acc;
  }, {});

export default defineConfig({
  root: 'example',
  build: {
    outDir: resolve(__dirname, 'www/examples'),
    emptyOutDir: true,
    rollupOptions: {
      input: exampleFiles
    }
  },
  server: {
    open: true
  },
  resolve: {
    alias: {
      'rc-dock': resolve(__dirname, 'src/index.ts')
    }
  }
});