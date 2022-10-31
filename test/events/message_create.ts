import {Events, Client} from '../../packages'
export default class extends Events {
  constructor(client: Client) {
    super()
    this.render(client, 'MESSAGE_CREATE', (message) => {
      console.log(`${message.author.username}: ${message.content}`)
    })
  }
}