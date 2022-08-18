type ReadyFunc = () => any;
type OnMessageCreateFunc = (message: any) => any;

type ReadyEventName = {
  READY: ReadyFunc;
  "Đã kích hoạt": ReadyFunc;
};
type OnMessageCreateEventName = {
  MESSAGE_CREATE: OnMessageCreateFunc;
  "Tin nhắn được tạo": OnMessageCreateFunc;
};

export const OnMessageCreateEventNameArray: Array<
  keyof OnMessageCreateEventName
> = ["MESSAGE_CREATE", "Tin nhắn được tạo"];
export const ReadyEventNameArray: Array<keyof ReadyEventName> = [
  "READY",
  "Đã kích hoạt",
];

export type IClientEvent = ReadyEventName & OnMessageCreateEventName;
