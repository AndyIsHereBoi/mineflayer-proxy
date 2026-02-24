process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const { createBot } = require('mineflayer')
const socks = require('socks').SocksClient
const config = require('./config.json')

const bot = createBot({
  username: config.mcUsername,
//   password: config.mcPassword,
  auth: config.mcAuthType,
  host: config.mcServerHost,
  port: config.mcServerPort,
  connect: (client) => {
    socks.createConnection({
      proxy: {
        host: config.proxyHost,
        port: config.proxyPort,
        type: 5,
        userId: config.proxyUsername,
        password: config.proxyPassword
      },
      command: 'connect',
      destination: {
        host: config.mcServerHost,
        port: config.mcServerPort
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