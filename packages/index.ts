/* eslint-disable max-len */
import { Client } from './client';

const client = new Client({
	token: process.env.TOKEN
});

client['sự kiện']('Tin nhắn được tạo', (message) => {
	console.log(`${message.author.username}: ${message.content}`);
});

client.on('Đã kích hoạt', () => {
	console.log('sống rồi anh em');
});

client['kích hoạt']();
