/* eslint-disable max-len */
import {Client} from './client';

const client = new Client({
  token: process.env.DISCORD_TOKEN,
  intents: [5, 1, 3],
});

client['sự kiện']('Tin nhắn được tạo', (message) => {
  console.log(message.d.content);
  console.log('true');
});

client.on("Đã kích hoạt", () => {
  console.log('sống rồi anh em');
})

client['kích hoạt']();
