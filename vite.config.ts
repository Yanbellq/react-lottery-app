import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // @ теперь ссылается на src
            '@components': path.resolve(__dirname, './src/components'), // @components теперь ссылается на src/components
            '@styles': path.resolve(__dirname, './src/styles'), // @styles теперь ссылается на src/styles
            '@hooks': path.resolve(__dirname, './src/hooks'), // @hooks теперь ссылается на src/hooks
            '@utils': path.resolve(__dirname, './src/utils'), // @utils теперь ссылается на src/utils
            // '@services': path.resolve(__dirname, './src/services'), // @services теперь ссылается на src/services
            '@contexts': path.resolve(__dirname, './src/contexts'), // @contexts теперь ссылается на src/contexts
            '@assets': path.resolve(__dirname, './src/assets'), // @assets теперь ссылается на src/assets
            '@types': path.resolve(__dirname, './src/types'), // @types теперь ссылается на src/types
            '@pages': path.resolve(__dirname, './src/pages'), // @pages теперь ссылается на src/pages
            // '@router': path.resolve(__dirname, './src/router'), // @router теперь ссылается на src/router
            // '@api': path.resolve(__dirname, './src/api'), // @api теперь ссылается на src/api
        },
    },
});
