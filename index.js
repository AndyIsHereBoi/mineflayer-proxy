process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
require('dotenv').config()
const { createBot } = require('mineflayer')
const socks = require('socks').SocksClient

const bot = createBot({
  username: process.env.MC_USERNAME,
//   password: process.env.MC_PASSWORD,
  auth: process.env.MC_AUTH_TYPE,
  host: process.env.MC_SERVER_HOST,
  port: parseInt(process.env.MC_SERVER_PORT),
  connect: (client) => {
    socks.createConnection({
      proxy: {
        host: process.env.PROXY_HOST,
        port: parseInt(process.env.PROXY_PORT),
        type: 5,
        userId: process.env.PROXY_USERNAME,
        password: process.env.PROXY_PASSWORD
      },
      command: 'connect',
      destination: {
        host: process.env.MC_SERVER_HOST,
        port: parseInt(process.env.MC_SERVER_PORT)
      }
    }, (err, info) => {
      if (err) {
        console.log(err)
        return
      }
      client.setSocket(info.socket)
      client.emit('connect')
    })
  }
})

bot.once('spawn', () => console.log('spawned'))