import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/', // Match this with your deployment path
  plugins: [vue()],
});