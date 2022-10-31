import {Events, Client} from '../../packages'
export default class extends Events {
  constructor(client: Client) {
    super()
    this.render(client, 'READY', () => {
      console.log('hello')
    })

  }
}