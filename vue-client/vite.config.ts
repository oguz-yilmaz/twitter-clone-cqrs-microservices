import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL('./src', import.meta.url)),
            "@components": fileURLToPath(new URL('./src/components', import.meta.url)),
            "@bootstrap": fileURLToPath(new URL('./node_modules/bootstrap/dist', import.meta.url)),
        },
    },
    server: {
        hmr: {
            clientPort: 8888 // vite@2.5.2 and newer: clientPort
        }
    }
})
