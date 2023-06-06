/* eslint-disable max-len */
import { Client } from '../packages';
import { botToken } from './config.json';
import { Channel } from '../lib/discial-api/src/index';

export const client = new Client({
	token: process.env.TOKEN,
}).setUtilClass((client) => {
	return {
		channel: new Channel().init(client.token),
	};
});
client.on("READY", () => {
	console.log(`${client}`)
})
client.setEvent('./test/events');
client.initEvent();

client.login();
