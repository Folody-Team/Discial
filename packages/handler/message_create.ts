import {Client} from '../client'
import { OnMessageCreateEventNameArray } from '../constants/eventsType';
import fetch from 'node-fetch';
import { Message } from '../message';

export type messageData = Message

export default async function (client: Client) {
  const data = JSON.parse(client.data) 
    const messageData: messageData = await Message.GetMessageByID(
			data.d.id,
			data.d.channel_id,
			client.token
		);
    OnMessageCreateEventNameArray.forEach((event) => {
      client.emit(event, messageData);
    });
}