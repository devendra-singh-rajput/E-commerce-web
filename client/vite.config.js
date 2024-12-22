import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default output directory for Vite
  },
  // this is add for hostin at local network
  server: {
    host: '0.0.0.0', // This allows access from other devices on the local network
    port: 5173, // You can choose any port
},
})
