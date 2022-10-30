/* eslint-disable max-len */
import {MáyTính} from './client';

const máytính = new MáyTính({
  token: 'OTk4MTQzNTQzMTc4NjkwNTkw.GLcQYP.FiZ9VQtxGS_wK6WiFiGBHjcfhghAI9mzxSWZnA',
  intents: [5, 1, 3],
  status: 'không công việc',
});

máytính['sự kiện']('Tạo tin nhắn', (message) => {
  console.log(message);
  console.log('true');
});

máytính['kích hoạt']();
