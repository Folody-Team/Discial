import {Events, Client, verifyEvent} from '../../packages'

@verifyEvent
export default class extends Events {
  constructor(client: Client) {
    super()
    this.render(client, 'READY', () => {
      console.log('hello')
    })

  }
}