/* eslint-disable max-len */
import { Client } from '../packages';
import { botToken } from "./config.json";

const client = new Client({
	token: process.env.TOKEN
});


client.setEvent('./test/events');
client.initEvent();

client.login();

