import { error } from '@sveltejs/kit';
export const prerender = true;
export async function load({ fetch }) {
	try {
		const response = await fetch('api/blog.json');
		const allBlogs = await response.json();
		return { allBlogs };
	} catch (e) {
		error(404, `Could not find blog posts`);
	}
}
