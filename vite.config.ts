import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { env } from 'vite-plugin-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    env({
      include: ['ACCESS_TOKEN'],
  })
  ],
})
