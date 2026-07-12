import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Set up standard aliasing for clean import structures as the application scales
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
