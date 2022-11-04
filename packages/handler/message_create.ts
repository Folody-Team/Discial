import {Client} from '../client'
import { OnMessageCreateEventNameArray } from '../constants/eventsType';
import fetch from 'node-fetch';

export type messageData = {
  content: string;
  embeds: [];
  components: [];
  channelId: string;
  author: {
    username: string; 
    id: string;
  };
  id: string;
  send: (content: string) => void;
}

export default async function (client: Client) {
  const data = JSON.parse(client.data) 
  console.log(data)
    const messageData: messageData = {
      content: data.d.content,
      embeds: data.d.embeds,
      components: data.d.components,
      channelId: data.d.channel_id,
      author: {
        username: data.d.author.username,
        id: data.d.author.id
      },
      id: data.d.id,
      send: async function (content) {
        await fetch(`https://discord.com/api/v10/channels/${data.d.channel_id}/messages`, {
          method: 'POST',
          headers: {
            Authorization: `Bot ${client.token}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/Folody-Team/Discial, 1.0.0)',
          },
          body: JSON.stringify({
            content: content
          })
        })
      }
    }
    OnMessageCreateEventNameArray.forEach((event) => {
      client.emit(event, messageData);
    });
}