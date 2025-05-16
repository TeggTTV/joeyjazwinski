const INDEX_NOW_KEY = '5v3zcfx3c5vxhmctq733ryjw3u8va7f4';
const SEARCH_ENGINES = [
	'https://www.google.com',
	'https://www.bing.com',
	'https://www.yandex.com',
    'https://www.seznam.cz',
    'https://www.naver.com',
    'https://www.baidu.com',
    'https://www.sogou.com',
];

/**
 * Notify IndexNow about a new blog post.
 * @param {string} blogUrl - The full URL of the new blog post.
 */
export async function notifyIndexNow(blogUrl: string): Promise<void> {
	const promises = SEARCH_ENGINES.map((engine) => {
		const apiUrl = `${engine}/indexnow?url=${encodeURIComponent(
			blogUrl
		)}&key=${INDEX_NOW_KEY}`;
		return fetch(apiUrl, { method: 'GET' })
			.then((response) => {
				if (!response.ok) {
					console.error(
						`Failed to notify ${engine}:`,
						response.statusText
					);
				} else {
					console.log(
						`Successfully notified ${engine} about ${blogUrl}`
					);
				}
			})
			.catch((error) => {
				console.error(`Error notifying ${engine}:`, error);
			});
	});

	await Promise.all(promises);
}
