import {Events, verifyEvent} from '../../packages'
import type { ClientType } from '../types/client';

@verifyEvent
export default class extends Events {
	constructor(client: ClientType) {
		super();
		this.render(client, 'MESSAGE_CREATE', (message) => {
			console.log(`${message.author.username}: ${message.content}`);
			if (message.content == 'discial') {
				message.send(
					'Bot này được tạo ra bởi Discial một thư viện phát triển bot discord của tương lai!'
				);
			}
		});
	}
}