import {Events, verifyEvent} from '../../packages'
import type { ClientType } from '../types/client';

@verifyEvent
export default class extends Events {
	constructor(client: ClientType) {
		super();
		this.render(client, 'READY', () => {
			console.log('hello');
		});
	}
}