/* eslint-disable @typescript-eslint/no-unused-vars */
import {Client} from '../client'
import path from 'path'
export function initEvent(dirname: string, client: Client) {
  import('node:fs').then(fs => {
    fs.readdir(`${dirname}`, (err, data) => {
      if(err) throw new Error(`${dirname} not found`)

      data.forEach(async file => {
        if(file.includes('jsx') || file.includes('js') || file.includes('tsx') || file.includes('ts')) {
          const {default: Init} = await import(path.resolve(`${dirname}/${file}`))
          new Init(client)

        }
      })
    })
  })
}