import https, { RequestOptions } from 'https';
import zlib from 'zlib';
import {method, options} from '../.';
import {rest} from '../utils/api';

/**
 * @class Channel
 */
export class Channel {
  /**
   * @private {https, method}
   */
  private static method: typeof method = method;

  /**
   * @protected {token, gzip}
   */
  protected static token = '';
  protected static gzip = {
    flush: zlib.Z_SYNC_FLUSH,
		finishFlush: zlib.Z_SYNC_FLUSH
  }
  
  /**
   * 
   * @param url 
   * @param method 
   * @param body 
   * @returns 
   */
  private static rest(url: string, method: string, body?: any) {

    /**
     * @return {Promise<unknown>}
     */
    return rest(url, method, body, this.token)

  }

  /**
   * 
   * @param token 
   */
  public static init(token: string) {
    this.token = token;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  public static getChannel(id?: string) {
    return this.rest(`channels.${id}`, this.method.GET)
    
  }
}