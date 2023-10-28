const combineRoute = require('koa-combine-routers')
const servers = require('./servers')
const sse = require('./sse')

const router = combineRoute(
  servers,
  sse
)

module.exports = router
