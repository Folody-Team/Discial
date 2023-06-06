import zlib from 'zlib';
import https from 'https';
import { homepage } from '../../package.json';

const gzip = {
	flush: zlib.Z_SYNC_FLUSH,
	finishFlush: zlib.Z_SYNC_FLUSH,
};

function makeid(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 *
 * @param endpoint
 * @returns
 */
function createEndpoint(endpoint: string) {
	/**
	 * Vietnamese comment: Ở đây nó sẽ trả về một object có kiểu là RequestOptions và sẽ hõ trợ cho request.
	 */
	return `https://discord.com/api/v10${endpoint}`;
}

/**
 *
 * @param url
 * @param method
 * @param body
 * @param token
 * @returns
 */
export function rest<BT = unknown, RT = unknown>(
	url: string,
	method: string,
	body?: BT,
	token?: string
) {
	return new Promise<RT>((resolve, reject) => {
		if (!token) reject(Error('Token not found'));
		let data = '';
		const userAgent = `DiscordBot-${makeid(20)} (${homepage}, 1.0.0)`;
		console.log(userAgent);
		const req = https.request(
			createEndpoint(url),
			{
				method: method,
				headers: {
					Authorization: `Bot ${token}`,
					'Content-Type': 'application/json; charset=UTF-8',
					'User-Agent': `${userAgent}`,
					'Accept-Encoding': 'gzip',
				},
				...body,
			},
			(res) => {
				// Tạo một tác nhiệm unzip
				const unzip = zlib.createGunzip(gzip);

				/**
				 * Vietnamese comment: SỰ kiện nếu có data trả về thì sẽ cộng dồn
				 */
				unzip.on('data', (chunk) => {
					data += chunk.toString();
				});
				/**
				 * Vietnamese comment: Sự kiện kết thúc thì nó sẽ trả về JSON data
				 */
				unzip.on('end', () => {
					const result = JSON.parse(data);
					resolve(result);
				});

				res.pipe(unzip);
			}
		);

		/**
		 * Kết thúc request tránh hang out
		 */

		req.end();
	});
}
