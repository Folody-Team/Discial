/* eslint-disable max-len */
import { Client } from '../packages';

const client = new Client({
	token: 'MTAyMjUzMDkyMDcwOTg4MTkyNg.GdEWHz.2n6j4CQN56o9LvmDlKvYx3wR3nwJwcfZCU8tvY'
});


client.setEvent('./test/events')
client.initEvent()

client.login();

