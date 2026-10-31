import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
            return 'vendor';
          }
          if (id.endsWith('/src/components/ServiceDetailPage.jsx')) return 'service-detail';
          if (id.includes('/src/components/Admin')) return 'admin';
          if (id.includes('/src/components/')) {
            const componentName = id.split('/').pop().split('.')[0];
            return `component-${componentName}`;
          }
          if (id.includes('/src/data/')) {
            const dataName = id.split('/').pop().split('.')[0];
            return `data-${dataName}`;
          }
          return undefined;
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['.trycloudflare.com'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            // Suppress noisy ECONNREFUSED terminal crash logs when backend is booting
            if (res && typeof res.writeHead === 'function' && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Backend server offline or starting on port 8000' }));
            }
          });
        }
      }
    }
  }
})
