/* eslint-disable max-len */
import { Client } from '../packages';

const client = new Client({
	token: 'MTAyMjUzMDkyMDcwOTg4MTkyNg.GdKHeC.MT-gWVCzW5z7BDxiqQbgAek0debLyaLXk6SS0I'
});


client.setEvent('./test/events')
client.initEvent()

client.login();

