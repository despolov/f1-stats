import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: '/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    eslint(),
  ],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    target: browserslistToEsbuild(['>0.2%', 'not dead', 'not op_mini all']),
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
