import https, { RequestOptions } from 'node:https';
import {method, options} from '../.';

class Channel {
  /**
   * @private {https, method}
   */
  private https: typeof https = https;
  private method: typeof method = method;


  /**
   * 
   * @param endpoint 
   * @returns 
   */
  private static reacteEndpoint(endpoint: string, options?: RequestOptions) {
    
    /**
     * Vietnamese comment: Ở đây nó sẽ trả về một object có kiểu là RequestOptions và sẽ hõ trợ cho request.
     */
    return {
      hostname: 'discord.com',
      port: '443',
      path: `/api/v10/${endpoint.replace('.', '/')}`,
      ...options
    } as RequestOptions
  }
  /**
   * 
   * @param options 
   */
  static getChannel(options?: options, id?: string) {
    let data = '';
    this.prototype.https.request(this.reacteEndpoint(`channels.${id}`, {
      method: this.prototype.method.GET,
      headers: {
        Authorization: `Bot ${options && options.token}`,
				'Content-Type': 'application/json; charset=UTF-8',
				'User-Agent': 'DiscordBot (https://github.com/Folody-Team/Discial, 1.0.0)',
      }
    }), (res) => {
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('close', () => {
        data = JSON.parse(data)
      })
      
    })

    return data

  }
}