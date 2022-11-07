import {Channel} from '../src/index'


const channel = Channel
channel.init('TOKEN HERE')
channel.getChannel('ID CHANNEL').then((data) => {
  console.log(data)
})