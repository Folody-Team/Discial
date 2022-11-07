import { Channel } from '../src/index'
import { botToken, channelTest } from "./config.json" 

const channel = Channel
channel.init(botToken)
channel.getChannel(channelTest.channelID.toString()).then((data) => {
  console.log(data)
})