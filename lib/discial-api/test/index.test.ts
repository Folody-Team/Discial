import {Channel} from '../src/index'


const channel = Channel
channel.init('TOKEN HERE')
channel.getChannel('ID CHANNEL BOT IN').then((data) => {
  console.log(data)
})