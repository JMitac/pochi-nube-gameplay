import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': 'http://localhost:2567',
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Separate long-lived vendor chunks so the browser caches them between deploys.
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom', 'react-dom/client', 'react-dom/server'],
          network: ['colyseus.js'],
        },
      },
    },
  },
});
