import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	server: {
        fs: {
            allow: [
                // Add the directory containing your JSON file
                path.resolve(__dirname, 'data')
            ]
        }
    }
});