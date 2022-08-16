/* eslint-disable max-len */
import {Client} from './client';

const client = new Client({
  token: 'TOKEN HERE',
  intents: [5, 1, 3],
});

client['sự kiện']('Tạo tin nhắn', (message) => {
  console.log(message);
  console.log('true');
});

client['kích hoạt']();
