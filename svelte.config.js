import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-markdown.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: (code, lang) => {
					if (lang && Prism.languages[lang]) {
						const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
						return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
					}
					return `<pre><code>${code}</code></pre>`;
				}
			}
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$src: './src',
			'$src/*': './src/*',
			$components: './src/components',
			'$components/*': './src/components/*'
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
					return;
				}

				// otherwise fail the build
				throw new Error(message);
			}
		}
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;
