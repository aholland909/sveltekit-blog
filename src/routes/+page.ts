import { error } from '@sveltejs/kit';
export const prerender = true;
export async function load({ fetch }) {
	try {
		const response = await fetch('api/blog/featured.json');
		if (!response.ok) return error(404, `Could not find blog posts`);
		const featured = await response.json();

		const allBlogPosts = await fetch('api/blog.json');
		const allBlogs = await allBlogPosts.json();
		const sortedPosts = allBlogs.sort((a, b) => {
			return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
		});

		const recentBlogs = sortedPosts.slice(0, 3);
		return { featured, recentBlogs };
	} catch (e) {
		error(404, `Could not find blog posts`);
	}
}
