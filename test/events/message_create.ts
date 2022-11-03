import {Events, Client, verifyEvent} from '../../packages'
@verifyEvent
export default class extends Events {
  constructor(client: Client) {
    super()
    this.render(client, 'MESSAGE_CREATE', (message) => {
      console.log(`${message.author.username}: ${message.content}`)
    })
  }
}