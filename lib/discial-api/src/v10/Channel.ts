import { BaseClient } from '../Base/Client';

/**
 * @class Channel
 */
export class Channel extends BaseClient {
	/**
	 *
	 * @param id
	 * @returns
	 */
	public getChannel(id?: string) {
		return this.rest(`channels.${id}`, Channel.method.GET);
	}
}
