const Router = require('koa-router')
const servers = require('../../db/db')
const router = new Router()
const { v4: uuid } = require('uuid')
const Server = require('../../items/Server')
const Log = require('../../items/log')

const pause = 20000

router.get('/servers', async (ctx) => {
  ctx.response.body = { servers: servers.data.map(server => { return { id: server.id, status: server.state } }) }
})

router.get('/servers/:id', async (ctx) => {
  const server = servers.data.find(server => server.id === ctx.params.id)

  ctx.response.body = { server }
})

router.get('/log', async (ctx) => {
  ctx.response.body = { log: servers.logs }
})

router.post('/servers', async (ctx) => {
  const id = uuid()
  servers.addLog(new Log(id, 'received: Create command'))
  setTimeout(() => {
    const server = new Server(id)
    servers.addLog(new Log(id, 'Created'))
    servers.add(server)
  }, pause)
  ctx.response.status = 201
})

router.patch('/servers', async (ctx) => {
  const { id, state } = JSON.parse(ctx.request.body)
  servers.addLog(new Log(id, `received: ${state} command`))
  setTimeout(() => {
    servers.addLog(new Log(id, state))
    servers.update(id, state)
  }, pause)

  ctx.response.status = 200
})

router.delete('/servers/:id', async (ctx) => {
  servers.addLog(new Log(id, 'received: Delete command')) //eslint-disable-line 
  setTimeout(() => {
    servers.delete(ctx.params.id)
    servers.addLog(new Log(id, 'Deleted')) //eslint-disable-line 
  }, pause)

  ctx.response.status = 200
})

module.exports = router
