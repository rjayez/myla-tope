import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtoolsPlugin from "solid-devtools/vite";


export default defineConfig({
  plugins: [solidPlugin(), devtoolsPlugin({autoname: true})],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
