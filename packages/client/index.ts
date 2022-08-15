/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-trailing-spaces */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable semi */
// eslint-disable-next-line new-cap, no-unused-vars
import ws = require('ws');

import {WebSocket} from '../server/WebSocket';
// eslint-disable-next-line new-cap, object-curly-spacing, no-unused-vars
import {DiscordGateway} from '../@api/link';
import {eventsType} from '../constants';
import {setWsHeartbeat} from "ws-heartbeat/client";
import {EventEmitter} from "events";


type options = {
  token: string;
  intents: string[] | number[];
};

type ValueOf<T> = T[keyof T];

export declare interface Client extends EventEmitter {
  on(event: ValueOf<eventsType>, listener: (...args: any[]) => void): this;
}
// eslint-disable-next-line require-jsdoc
export class Client extends EventEmitter {
  private ws: WebSocket | undefined;
  private options: options | undefined;
  private gateway: string = DiscordGateway.init(10);
  private data: string = '{}';

  // eslint-disable-next-line require-jsdoc
  /**
   * 
   * @param option 
   */
  constructor(option: options) {
    super();
    Object.assign(this, {options: option});
  }
  // eslint-disable-next-line require-jsdoc
  public 'sự kiện' = this.on;
  // eslint-disable-next-line require-jsdoc
  public 'kích hoạt'(): Promise<void> {
    return new Promise((res, rej) => {
      const {token, intents} = this.options!;
      this.active(token, intents);
    });
  }
  /**
   * 
   * @param ws 
   * @param payload 
   */
  private async open(ws: WebSocket, payload: string) {
    ws.send(payload);
  }
  /**
   * 
   * @param ws 
   * @param data 
   */
  private async message(ws: WebSocket, data: ws.RawData, payload: string) {
    const {op, d, t} = JSON.parse(data.toString());
    switch (op) {
      case 0:
        break;
      case 10:
        const {heartbeat_interval} = d;
        this.keepAlive(ws, heartbeat_interval);
    }

    if (t) this.data = data.toString();
  }
  /**
   * 
   * @param ws 
   * @param interval 
   */
  private async keepAlive(ws: WebSocket, interval: number) {
    setInterval(() => {
      ws.send(JSON.stringify({op: 1, d: null}));
    }, interval);
  }
  /**
   * 
   * @param token 
   * @param intents 
   * @returns 
   */
  private async payload(token: string, intents: string[] | number[]) {
    const intent = Number(intents.join(''));

    return JSON.stringify({
      op: 2,
      d: {
        token: token,
        intents: intent,
        properties: {
          $os: 'linux',
          $browser: 'disco',
          $device: 'disco',
        },
      },
    });
  }
  /**
   * 
   * @param token 
   * @param intents 
   */
  private async active(token: string, intents: string[] | number[]) {
    const ws = new WebSocket(this.gateway);
    const payload = await this.payload(token, intents);
    this.ws = ws;
    ws.on('open', () => this.open(ws, payload));
    ws.on('message', (data) => {
      this.message(ws, data, payload);
      const {t} = JSON.parse(data.toString());
      if (t) this.emit(eventsType[t as keyof typeof eventsType], JSON.parse(data.toString()) as ws.Data);
    });
  }
};
