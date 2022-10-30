import {Client} from '../client'
import {Payload} from '../constants'
import {
	IClientEvent,
	OnMessageCreateEventNameArray,
	ReadyEventNameArray,
} from '../constants/eventsType';
import { dataReq } from '../constants/dataReq';
import { User } from '../user';


export default async function (client: Client, payload: Payload) {
    const user = new User(
      'hidden',
      JSON.parse(client.data).d.user
    );
    ReadyEventNameArray.forEach((event) => {
      client.emit(event);
    });
}