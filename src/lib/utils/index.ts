export const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/content/pages/**/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: any };
			const postPath = path.slice(19, -3);

			return {
				meta: metadata,
				path: `${postPath}`
			};
		})
	);

	return allPosts;
};
