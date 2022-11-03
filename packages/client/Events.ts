/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Client} from '.';
import {IClientEvent} from '../constants/eventsType';

/**
 * 
 * @param target 
 */
export function verifyEvent(target?: any): any {
  return class extends target {
    event = true
  }
  // target.prototype.event = true
  // target.constructor.prototype.event = true

  // // Object.assign(target?.prototype, {event: true});

  // Object.seal(target);
  // Object.seal(target?.prototype);

  
  // console.log(target?.prototype)
}

export class Events{
  public event!: boolean;
  public client!: Client
  /**
   * 
   * @param client 
   * @param event 
   * @param listener 
   */
  render<U extends keyof IClientEvent>(client: Client, event: U, listener: IClientEvent[U]) {
    this.client = client
    /**
     * Add {eventName, listener} properties to this class
     */
    Object.assign(this, {eventName: event, listener: listener})
  }
}