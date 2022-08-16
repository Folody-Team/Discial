import ws from "ws";
import { WebSocket } from "../server/WebSocket";
import { DiscordGateway } from "../@api/link";
import { setWsHeartbeat } from "ws-heartbeat/client";
import { EventEmitter } from "events";
import { ClientOptions } from "../typing/ClientOptions";
import {
  IClientEvent,
  OnMessageCreateEventNameArray,
  ReadyEventNameArray,
} from "../constants/eventsType";

type ValueOf<T> = T[keyof T];

declare interface Client extends EventEmitter {
  on<U extends keyof IClientEvent>(event: U, listener: IClientEvent[U]): this;

  emit<U extends keyof IClientEvent>(
    event: U,
    ...args: Parameters<IClientEvent[U]>
  ): boolean;
}
class Client extends EventEmitter {
  private ws: WebSocket | undefined;
  private options: ClientOptions | undefined;
  private gateway: string = DiscordGateway.init(10);
  private data: string = "{}";
  /**
   *
   * @param option
   */
  constructor(option: ClientOptions) {
    super();
    Object.assign(this, { options: option });
  }
  public "sự kiện" = this.on;
  public "kích hoạt"(): Promise<void> {
    return new Promise((res, rej) => {
      const { token, intents } = this.options!;
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
    ReadyEventNameArray.forEach((event) => {
      this.emit(event);
    });
  }
  /**
   *
   * @param ws
   * @param data
   */
  private async message(ws: WebSocket, data: ws.RawData, payload: string) {
    const { op, d, t } = JSON.parse(data.toString());
    switch (op) {
      case 0:
        break;
      case 10:
        const { heartbeat_interval } = d;
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
      ws.send(JSON.stringify({ op: 1, d: null }));
    }, interval);
  }
  /**
   *
   * @param token
   * @param intents
   * @returns
   */
  private async payload(token: string, intents: string[] | number[]) {
    const intent = Number(intents.join(""));

    return JSON.stringify({
      op: 2,
      d: {
        token: token,
        intents: intent,
        properties: {
          $os: "linux",
          $browser: "disco",
          $device: "disco",
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
    ws.on("open", () => this.open(ws, payload));
    ws.on("message", (data) => {
      this.message(ws, data, payload);
      const { t } = JSON.parse(data.toString());
      if (t) {
        OnMessageCreateEventNameArray.forEach((event) => {
          this.emit(event, JSON.parse(data.toString()) as ws.Data);
        });
      }
    });
  }
}
export { Client };
