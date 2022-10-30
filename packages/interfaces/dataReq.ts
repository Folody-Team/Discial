

export type dataReq = {
  op: number,
  d: {
    token: string,
    intents: string | number,
    properties: {
      $os: string,
      $browser: string,
      $device: string,
    },
    presence: {
      status: string,
    },
  },
};
