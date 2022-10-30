import {statusIn} from '../modules/status';

export type options = {
  token: string;
  intents: string[] | number[];
  status?: keyof typeof statusIn;
};
