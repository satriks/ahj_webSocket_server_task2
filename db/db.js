const servers = {

  data: [],
  logs: [],
  listener: null,

  add (server) {
    this.data.push(server)
    this.listener(server, 'addServer')
  },

  addLog (item) {
    this.logs.push(item)
    this.listener(item, 'log')
  },

  update (id, state) {
    this.data.find(server => server.id === id).state = state
    this.listener(this.data, 'updateServer')
  },

  delete (id) {
    this.data = this.data.filter(server => server.id !== id)
    this.listener(this.data, 'deleteServer')
  },

  listen (handler) {
    this.listener = handler
  }

}

module.exports = servers
