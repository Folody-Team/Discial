import { Client } from '../client';
import { Payload } from '../constants';
import {
  ReadyEventNameArray
} from '../constants/eventsType';
import { User } from '../user';


export default async function (client: Client, payload: Payload) {
    const user = new User(
      client.token,
      JSON.parse(client.data).d.user
    );
    ReadyEventNameArray.forEach((event) => {
      client.emit(event);
    });
}