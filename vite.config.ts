import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // @ теперь ссылается на src
            '@components': path.resolve(__dirname, './src/components'), // @components теперь ссылается на src/components
            '@styles': path.resolve(__dirname, './src/styles'), // @styles теперь ссылается на src/styles
            '@hooks': path.resolve(__dirname, './src/hooks'), // @hooks теперь ссылается на src/hooks
            '@utils': path.resolve(__dirname, './src/utils'), // @utils теперь ссылается на src/utils
            '@services': path.resolve(__dirname, './src/services'), // @services теперь ссылается на src/services
            '@assets': path.resolve(__dirname, './src/assets'), // @assets теперь ссылается на src/assets
        },
    },
});
