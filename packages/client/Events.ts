/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Client} from '.';
import {IClientEvent} from '../constants/eventsType';

export class Events{
  /**
   * 
   * @param client 
   * @param event 
   * @param listener 
   */
  render<U extends keyof IClientEvent>(client: Client, event: U, listener: IClientEvent[U]) {
    client.on(event, listener)
  }
}