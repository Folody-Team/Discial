import {Client} from '../client'
import {Payload} from '../constants'
import {
	IClientEvent,
	OnMessageCreateEventNameArray,
	ReadyEventNameArray,
} from '../constants/eventsType';
import { dataReq } from '../constants/dataReq';
import { User } from '../user';

export type messageData = {
  content: string;
  embeds: [];
  components: [];
  author: {
    username: string;
    id: string;
  };
  id: string;
}

export default async function (client: Client, payload: Payload) {
  const data = JSON.parse(client.data) 
    const messageData: messageData = {
      content: data.d.content,
      embeds: data.d.embeds,
      components: data.d.components,
      author: {
        username: data.d.author.username,
        id: data.d.author.id
      },
      id: data.d.id
    }
    OnMessageCreateEventNameArray.forEach((event) => {
      client.emit(event, messageData);
    });
}