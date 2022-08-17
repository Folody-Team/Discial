/* eslint-disable no-this-before-super */
/* eslint-disable no-trailing-spaces */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import ws from 'ws';

// eslint-disable-next-line no-unused-vars
export class WebSocket extends ws {
  // eslint-disable-next-line spaced-comment
  //////////////////////////
  /**
   * @private {gateway, ws}
   * @param {string} gateway
   * @returns {WebSocket}
   */
  // eslint-disable-next-line constructor-super
  /**
   * 
   * @param gateway 
   */
  constructor(gateway: string) {
    super(gateway);
  }
}
