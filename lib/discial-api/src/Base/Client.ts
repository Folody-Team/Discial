import { rest } from '../utils/api';
import zlib from 'zlib';
import { method, options } from '../.';
import https, { RequestOptions } from 'https';
import { Client } from '../../../../packages/client/index';

/**
 * @access package
 * @class BaseClient
 */
export abstract class BaseClient {
	/**
	 * @protected {https, method}
	 */
	protected static method: typeof method = method;

	/**
	 * @protected {token, gzip}
	 */
	protected token = '';
	protected static gzip = {
		flush: zlib.Z_SYNC_FLUSH,
		finishFlush: zlib.Z_SYNC_FLUSH,
	};
	constructor() {
		/** */
	}
	/**
	 *
	 * @param url
	 * @param method
	 * @param body
	 * @returns
	 */
	protected rest<BT = unknown, RT = unknown>(
		url: string,
		method: string,
		body?: BT
	) {
		/**
		 * @return {Promise<unknown>}
		 */
		return rest<BT, RT>(url, method, body, this.token);
	}

	/**
	 *
	 * @param token
	 */
	public init(token: string) {
        this.token = token;
        return this
	}
    
}
