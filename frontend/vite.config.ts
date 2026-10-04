import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 38202,
    proxy: {
      '/api': 'http://localhost:38302',
    },
  },
});
