import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Served from https://rohitkum549.github.io/briefcase/ in production (GitHub
// Pages project site), so assets need the repo name as the base path there.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/briefcase/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
