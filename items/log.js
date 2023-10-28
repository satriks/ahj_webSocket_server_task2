
class Log {
    constructor(id, changes) {
        this.id = id
        this.changes = changes
        this.date = Date.now()  
     
    }
}

module.exports = Log