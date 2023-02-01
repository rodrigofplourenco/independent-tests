import server from './server.js'

server.listen(3333)
      .on('listening', () => console.log(`Running at port ${server.address().port}`))
