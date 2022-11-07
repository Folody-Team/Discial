import zlib from 'zlib';
import https from 'https';

const gzip = {
  flush: zlib.Z_SYNC_FLUSH,
  finishFlush: zlib.Z_SYNC_FLUSH
}

/**
 * 
 * @param endpoint 
 * @returns 
 */
function createEndpoint(endpoint: string) {
    
  /**
   * Vietnamese comment: Ở đây nó sẽ trả về một object có kiểu là RequestOptions và sẽ hõ trợ cho request.
   */
  return `https://discord.com/api/v10${endpoint}`
}

/**
 * 
 * @param url 
 * @param method 
 * @param body 
 * @param token 
 * @returns 
 */
export function rest(url: string, method: string, body?: any, token?: string) {
  return new Promise((resolve, reject) => {
    if(!token) reject(Error('Token not found'));
    let data = '';
    const req = https.request(createEndpoint(url), {
      method: method,
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'DiscordBot (https://github.com/Folody-Team/Discial, 1.0.0)',
        'Accept-Encoding': 'gzip'
      },
      ...body
    }, res => {
      // Tạo một tác nhiệm unzip
      const unzip = zlib.createGunzip(gzip)
      
      /**
       * Vietnamese comment: SỰ kiện nếu có data trả về thì sẽ cộng dồn
       */
      unzip.on('data', (chunk) => {
        data += chunk.toString()
      })
      /**
       * Vietnamese comment: Sự kiện kết thúc thì nó sẽ trả về JSON data
       */
      unzip.on('end', () => {
        data = JSON.parse(data);
        resolve(data)
      })

      res.pipe(unzip);

      
    })

    /**
     * Kết thúc request tránh hang out
     */

    req.end()
  })

}